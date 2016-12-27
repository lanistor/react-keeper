import React from 'react'
import ReactDOM from 'react-dom'
import matchPath from './match/matchPath'
import { hashCode, resetPath, objectWithoutProperties, isStatelessComponent, isMountedComponent } from './Util'
import HistoryControl from './HistoryControl'
import { shouldMatch, addMatch, removeMatch, getMatchedPath, getSelfPathname, checkMissMatch } from './RouteControl'
import Logger from './Logger'
import RouteUtil from './RouteUtil'

export default class Route extends RouteUtil {

  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,        // 0: unmount, 1: mounted
      mountBy: 0        // 0: mount by route or none, 1: mount by 'cache', 2: mount by 'CacheLink'
    }

    // console.log('context- route', this.match())
    if(!this.context.groupCode) {
      this.groupCode = hashCode()
    }

    this.unsubscribe = this.context.subscribe(this.locationChanged)

    this.matcher = null
    this.component = null
  }

  static contextTypes = {
    routes: React.PropTypes.array,
    history: React.PropTypes.any,
    subscribe: React.PropTypes.any,
    groupCode: React.PropTypes.string
  }

  static propTypes = {
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

  static childContextTypes = {
    routes: React.PropTypes.any,
    groupCode: React.PropTypes.string
  }

  componentDidMount() {
    this.locationChanged()
  }

  locationChanged = ()=> {
    this.routeCheckEntry()
  }

  getChildContext = ()=> {
    return {
      routes: this.context.routes? [ ...this.context.routes, this ] : [ this ],
      groupCode: this.context.groupCode || this.groupCode
    }
  }

  /**
   * entry of check
   * compute route mount's state
   */
  routeCheckEntry = ()=> {

    if(!this.checkParent()) {
      this.setToUnmount()
      return
    }

    let status = this.checkPath()? 1 : 0

    if(status === 0) {
      this.checkMiss()
    }

    if(status === 1) {
      this.updateMatchedGroup()
    }

    if(status === this.state.status
        && (status===1? 0 : this.state.mountBy) === this.state.mountBy) {
      /** no changed do */
      return
    }

    if(status === 1) {
      this.setToMount()
      return
    }

    this.setToUnmount()
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

        /** Step 3 : check 'redirect' props */
        const { redirect } = this.props
        if(redirect && typeof redirect === 'string') {
          HistoryControl.replace(redirect)
          return
        }

        this.updateMountStatus(1)
      })

    })
  }

  /**
   * set to unmount state
   */
  setToUnmount = ()=> {

    /** Step 1: check cache, link cache & tag cache */
    let cache = this.isCached()
    if(cache) {
      if(this.state.mountBy !== cache && this.state.status === 1) {
        this.updateMountStatus(1, cache)
      }
      return
    }

    /** Step 2 : check leave filters */
    this.checkFilter(this.props.leaveFilter, (passed)=> {
      if(!passed) {
        return
      }
      this.updateMountStatus(0)
    })
  }

  /** update bind state */
  updateMountStatus = (status, mountBy)=> {
    if(typeof mountBy === 'undefined' || mountBy === null) {
      mountBy = 0
    }
    if(!isMountedComponent(this)) {
      return
    }
    if(status === 1) {
      this.setState({
        status,
        mountBy,
        selfPathname: this.getSelfPath()
      })
    }else{
      this.setState({ status, mountBy })
    }

    this.checkCacheTag(status===0)
  }

  componentWillUnmount = ()=> {
    this.unsubscribe()
    this.checkCacheTag(true)
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
      // console.log('%c--mount--', 'color:red', this.state, this.component.name)
      const props = objectWithoutProperties(this.props, [
        'children', 'component', 'loadComponent', 'enterFilter', 'leaveFilter', 'path', 'redirect',
        'cache', 'index', 'miss'
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
