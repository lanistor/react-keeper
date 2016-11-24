import React from 'react'
import matchPath from './match/matchPath'
import { shouldMatch, addMatch, removeMatch, checkIndexMatch } from './RouteControl'

export default class Route extends React.Component {
  
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0  //0: unbind, 1: bind
    }
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
      this.setState({ component })                       // save component

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

    let status = this.checkMatch(nextProps)
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
    // if(this.state.component) {
    //   callback(true, component)
    //   return
    // }
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
    if(status === 1) {
      addMatch(this)
    } else {
      removeMatch(this)
    }
    this.setState({ status })
  }

  componentWillUnmount = ()=> {
    removeMatch(this)
  }
  
  /**
   * check if path matched
   */
  checkMatch = (nextProps)=> {
    let status = 0
    const { path: pattern, multiple, index: isIndex } = nextProps
    const { pathname } = this.context.history? this.context.history.location : { }

    if(typeof pathname === 'undefined') {
      return 0
    }
    if(typeof pattern === 'undefined') {
      return 1
    }

    let matcher = matchPath(pathname, pattern)
    if(matcher.match) {
      if(multiple || shouldMatch(this, false)) {
        return 1
      }else{
        return 0
      }
    }else {
      if(shouldMatch(this, false)) {
        console.log(this, isIndex)
        if(isIndex) {
          checkIndexMatch(this)
        }
      }
      status = 0
    }
    this.setState({ status })
  }
  

  render = ()=> {

    console.log('--render-', this.props.component.name, this.state.component? this.state.component.name : null, this.state.status, this)

    const { path, multiple, remain, children, ...props } = this.props
    const { pathname } = this.context.history? this.context.history.location : { }

    if(this.state.status === 0) {
      return null
    }

    if(this.state.component) {
      return React.createElement(this.state.component, { pathname, ...props }, children)
    }
    if(!children) {
      return null
    }
    console.log('--Route--', this.props.component.name, children)
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
