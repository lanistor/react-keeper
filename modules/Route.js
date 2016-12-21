import React from 'react'
import ReactDOM from 'react-dom'
import matchPath from './match/matchPath'
import { resetPath, objectWithoutProperties, isStatelessComponent } from './Util'
import { OuterControl } from './OuterControl'
import { shouldMatch, addMatch, removeMatch, getMatchedPath, getSelfPathname, checkMissMatch } from './RouteControl'
import Logger from './Logger'

export default class Route extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,        // 0: unmount, 1: mounted
      mountBy: 0        // 0: mount by route or none, 1: mount by 'cache', 2: mount by 'hook'
    }

    this.matcher = null
    this.component = null
  }

  getChildContext = ()=> {
    return {
      routes: this.context.routes? [ ...this.context.routes, this ] : [ this ]
    }
  }

  componentWillMount = ()=> {
    this.routeCheckEntry(this.props)
    this.hideOrShow()
  }

  componentWillReceiveProps = (nextProps)=> {
    this.routeCheckEntry(nextProps)
  }

  /**
   * entry of check
   * compute route mount's state
   */
  routeCheckEntry = (nextProps)=> {

    let { component } = this.props

    /** Step 1 : check match result & component parent */
    let { status, matcher } = this.checkMatch(nextProps)
    if(status === 1) {
      addMatch(this)
    }
    // if(this.state.status === status) {
    //   return
    // }

    /** Step 2 : set route state  */
    if(status === 1) {         // unmount to mount

      this.setToMount()

    }else if(status === 0) {   // mount to unmount

      this.setToUnmount()

    }
  }

  /**
   * set to mount state
   * (also invoke by outside)
   */
  setToMount = ()=> {

    /** Step 1 : dynamic load component */
    this.loadComponent((result, component)=> {
      if(!result) {
        return
      }
      this.component = component

      /** Step 2 : check enter filters */
      this.checkFilter(this.props.enterFilter, (passed)=> {
        if(!passed) {
          return
        }
        this.updateMountStatus(1)
      })

      /** Step 3 : check 'redirect' props */
      const { redirect } = this.props
      if(redirect && typeof redirect === 'string') {
        OuterControl.replace(redirect)
      }

    })
  }

  /**
   * set to unmount state
   */
  setToUnmount = ()=> {

    /** Step 1 : check cache tag */
    const { 'cache': cache } = this.props

    if(cache) {
      if(this.state.mountBy !== 1 && this.state.status === 1) {
        this.updateMountStatus(1, 1)
      }
      return
    }

    /** Step 2 : check Link(target=_new) state */
    //

    /** Step 3 : check leave filters */
    this.checkFilter(this.props.leaveFilter, (passed)=> {
      if(!passed) {
        return
      }
      this.updateMountStatus(0)
    })
  }

  /** load dynamic component */
  loadComponent = (callback)=> {
    if(this.component) {
      callback(true, this.component)
      return
    }
    let { component, loadComponent: dynamicComponent } = this.props
    if(component) {
      callback(true, component)
      return
    }
    if(dynamicComponent) {
      dynamicComponent((comp)=> {
        callback(true, comp)
      })
      return
    }
    callback(true, null)
  }

  /** component is dynamic */
  isDynamic = (component)=> {
    return false
  }

  /**
   * check filters
   * @param { Function or Array of function } filters : filters to check in order
   * @param { Function } callback(passed)
   *   @passed { Boolean } : pass result of filters
   */
  checkFilter = (filters, callback)=> {
    if(!filters) {
      callback(true)
      return
    }
    if(!(filters instanceof Array)) {
      filters = [ filters ]
    }
    let tempFilters = []
    for(let i=0; i<filters.length; i++) {
      if(typeof filters[i] === 'function') {
        tempFilters.push(filters[i])
      }
    }
    filters = tempFilters

    if(filters.length === 0) {
      callback(true)
      return
    }

    let pointer = 0    // record the index of the running filter

    const filterCallback = ()=> {
      if(pointer === filters.length-1) {
        callback(true)
      }else{
        filters[ ++pointer ](filterCallback, this.props, this.context)
      }
    }

    filters[0](filterCallback, this.props, this.context)
  }

  /** update bind state */
  updateMountStatus = (status, mountBy)=> {
    if(typeof mountBy === 'undefined' || mountBy === null) {
      mountBy = 0
    }
    if(status === 1) {
      this.setState({
        status,
        mountBy: mountBy,
        selfPathname: getSelfPathname(this) || '/'
      })
    }else
      this.setState({ status, mountBy })
  }

  componentWillUnmount = ()=> {
    removeMatch(this)
  }

  /**
   * check if the component matches the pathname
   * index       : when the path is equal to it's parent' path, this component will mount
   * miss        : when no component mount, this component will mount
   */
  checkMatch = (nextProps)=> {

    let status = 0
    let { path: pattern, 'multiple': multiple, 'index': rcIndex, 'miss': rcMiss } = nextProps
    let { pathname } = this.context.history? this.context.history.location : { }
    if(typeof pathname === 'undefined') {
      return { status: 0 }
    }
    pathname = resetPath(pathname)
    let matchedPath = getMatchedPath()

    if(pattern) {
      if(typeof pattern === 'undefined') {
        return { status: 1 }
      }

      pattern = resetPath(pattern)

      let checkPathname = pathname
      if(matchedPath) {
        checkPathname = pathname.substring(matchedPath.length)
      }

      let matcher = matchPath(checkPathname, pattern)
      this.matcher = matcher

      if(matcher.match) {
        if(multiple || shouldMatch(this)) {
          return { status: 1, matcher }
        }else{
          return { status: 0 }
        }
      }
    }

    if(rcIndex && ( matchedPath || '/') === pathname && shouldMatch(this)) {
      return { status: 1 }
    }

    if(rcMiss && shouldMatch(this)) {
      checkMissMatch(this)
    }
    return { status: 0 }
  }

  /** hide or show it's component after it mounted */
  hideOrShow = ()=> {
    const display = this.state.mountBy === 0? (this.initDisplay || null) : 'none'
    let dom
    try{
      dom = this.refs.component? ReactDOM.findDOMNode(this.refs.component) : null
    }catch(error) {
      Logger.warning('Cannot find dom')
      return
    }
    if(!dom) {
      if(React.isValidElement(this.props.children)) {
        dom = this.props.children[0]
      }
    }

    // change display
    if(dom) {
      if(typeof this.initDisplay === 'undefined') {
        this.initDisplay = dom? (dom.style.display || null) : null
      }
      dom.style.display = display
    }
  }

  componentDidUpdate() {
    this.hideOrShow()
  }

  render = ()=> {

    /** 1. unmount state */
    if(this.state.status === 0) {
      return null
    }

    const children = this.props.children

    /** 2. mount state */
    /** 2.1 check component props */
    if(this.component) {
      const props = objectWithoutProperties(this.props, [
        'children', 'component', 'loadComponent', 'enterFilter', 'leaveFilter', 'path', 'redirect',
        'multiple', 'cache', 'index', 'miss'
      ])
      // add route state to props
      props.route = { isActive: this.state.mountBy===0 }

      if(!isStatelessComponent(this.component)) {
        props.ref = 'component'
      }

      // create element
      return React.createElement(this.component,
        { pathname: this.state.selfPathname,
          ...props,
          params: this.matcher? (this.matcher.params || {}) : {}
        }, children)
    }

    /** 2.2 check children */
    if(!children) {
      Logger.error('Route component without children.')
      return null
    }
    if(React.isValidElement(children)) {
      return React.Children.only(children)
    }
    Logger.error('When `Route` component has no component property, it\'s children must be a single tag (not an array), like `div`|`view` .')
    return null
  }

}

Route.propTypes = {
  component: React.PropTypes.any,
  loadComponent: React.PropTypes.any,
  enterFilter: React.PropTypes.array,
  leaveFilter: React.PropTypes.array,
  path: React.PropTypes.string,
  redirect: React.PropTypes.string,
  multiple: React.PropTypes.any,
  cache: React.PropTypes.any,
  index: React.PropTypes.any,
  miss: React.PropTypes.any,
  children: React.PropTypes.any
}

Route.childContextTypes = {
  routes: React.PropTypes.any
}

Route.contextTypes = {
  history: React.PropTypes.object.isRequired,
  routes: React.PropTypes.any
}
