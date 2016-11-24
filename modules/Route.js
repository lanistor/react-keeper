import React from 'react'
import matchPath from './match/matchPath'
import { resetPath } from './Util'
import { shouldMatch, addMatch, removeMatch, getMatchedPath, checkMissMatch } from './RouteControl'

export default class Route extends React.Component {
  
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0  //0: unbind, 1: bind
    }

    this.matcher = null
    this.component = null
  }

  componentWillMount = ()=> {
    this.routeCheck(this.props)
  }

  componentWillReceiveProps = (nextProps)=> {
    this.routeCheck(nextProps)
  }

  /** set to mount state by outside */
  setToMount = ()=> {
    this.loadComponent((result, component)=> {
      if(!result) {
        return
      }
      this.component = component
      // this.setState({ component })                       // save component

      this.checkFilter(this.props.enterFilter, (result)=> {
        if(!result) {
          return
        }
        this.updateMountStatus(1)
      })

    })
  }

  /** check route mount needed */
  routeCheck = (nextProps)=> {

    let { component } = this.props

    let { status, matcher } = this.checkMatch(nextProps)
    if(status === 1) {
      addMatch(this)
    }
    if(this.state.status === status) {
      return
    }
    
    if(this.state.status === 0 && status === 1) {         // unmount to mount

      this.setToMount()

    }else if(this.state.status === 1 && status === 0) {   // mount to unmount
      this.checkLeaveFilter((result)=> {
        if(!result) {
          return
        }
        this.updateMountStatus(0)
      })
    }
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

  /** check filters */
  checkFilter = (filters, callback)=> {
    if(!filters) {
      callback(true)
      return
    }
    if(! filters instanceof Array) {
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

  /** check leave filter */
  checkLeaveFilter = (callback)=> {
    callback(true)
  }

  /** update bind state */
  updateMountStatus = (status)=> {
    this.setState({ status })
  }

  componentWillUnmount = ()=> {
    removeMatch(this)
  }
  
  /**
   * check if the component matches the pathname
   * rc-index       : when the path is equal to it's parent' path, this component will mount
   * rc-miss        : when no component mount, this component will mount
   */
  checkMatch = (nextProps)=> {

    let status = 0
    const { path: pattern, multiple, 'rc-index': rcIndex, 'rc-miss': rcMiss } = nextProps
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

    if(rcIndex && matchedPath === pathname && shouldMatch(this)) {
      return { status: 1 }
    }

    if(rcMiss && shouldMatch(this)) {
      checkMissMatch(this)
    }
    return { status: 0 }
  }
  

  render = ()=> {

    const { path, multiple, remain, children, ...props } = this.props
    const { pathname } = this.context.history? this.context.history.location : { }

    if(this.state.status === 0) {
      return null
    }

    if(this.component) {
      return React.createElement(this.component,
          { pathname,
            ...props,
            params: this.matcher? (this.matcher.params || {}) : {}
          }, children)
    }
    if(!children) {
      return null
    }
    return React.Children.only(children)
  }

}

Route.propTypes = {
  component: React.PropTypes.any,
  loadComponent: React.PropTypes.any,
  enterFilter: React.PropTypes.array,
  leaveFilter: React.PropTypes.array,
  path: React.PropTypes.string,
  multiple: React.PropTypes.string,
  remain: React.PropTypes.string,
  children: React.PropTypes.any,
  index: React.PropTypes.any
}

Route.contextTypes = {
  history: React.PropTypes.object.isRequired
}
