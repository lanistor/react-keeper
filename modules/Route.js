import React from 'react'
import { resetPath, compare, objectWithoutProperties, isStatelessComponent, isMountedComponent } from './Util'
// import HistoryControl from './HistoryControl'
import { shouldMatch, addMatch, removeMatch, getMatchedPath, getSelfPathname } from './RouteControl'
import Logger from './Logger'

import RouteBase from './middleware/RouteBase'
import RouteCache from './middleware/RouteCache'
import RouteFilter from './middleware/RouteFilter'
// import RouteMiss from './middleware/RouteMiss'
import RouteRedirect from './middleware/RouteRedirect'

export default class Route extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,        // 0: unmount, 1: mounted
      mountBy: 0        // 0: mount by route or none, 1: mount by 'cache', 2: mount by 'CacheLink'
    }
    this.unsubscribe = this.context.subscribe(this.locationChanged)

    this.matcher = null
    this.component = null

    if(!this.context.history) {
      throw new Error('Route must be used in Router Component ( HashRouter,BrowserRouter or MemoryRouter )!')
    }
  }

  componentDidMount() {
    this.locationChanged()
  }

  locationChanged = ()=> {
    this.routeCheckEntry()
  }

  getChildContext = ()=> {
    return {
      parent: this
    }
  }

  /**
   * entry of check
   * compute route mount's state
   */
  routeCheckEntry = ()=> {

    let matchData = this.checkPath(this.context.history.getCurrentLocation() || {})

    if(matchData.match) {
      this.loadComponent((succeed, component)=> {
        if(!succeed) {
          return
        }

        this.setToMount(matchData)

        // this.updateMountStatus({ status: 1, matchData })

      })
      this.setToMount(matchData)
      return
    }

    this.setToUnmount(matchData)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.offDirtyCheck) {
      return true
    }
    if(nextState.status) {
      return true
    }
    return !compare(nextProps, this.props) || !compare(nextState, this.state)
  }

  /**
   * set to mount state
   * (also invoke by outside)
   */
  setToMount = (matchData)=> {
    this.updateMountStatus({ status: 1, matchData })
  }

  /**
   * set to unmount state
   */
  setToUnmount = (matchData)=> {
    this.updateMountStatus({ status: 0 })
  }

  /** update bind state */
  updateMountStatus = ({ status, mountBy, matchData })=> {
    console.log('~~updateMountStatus~~', status, mountBy, this.props.path, isMountedComponent(this))
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
        cacheMatch: matchData,
        selfPathname: this.getSelfPath(matchData && matchData.matcher)
      })
    }else{
      this.setState({ status, mountBy })
    }
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
      const props = objectWithoutProperties(this.props, [
        'children', 'component', 'loadComponent', 'enterFilter', 'leaveFilter', 'path', 'redirect',
        'cache', 'index', 'miss'
      ])
      // add route state to props
      props.route = { isActive: this.state.mountBy===0 }

      props.ref = 'component'

      // create element
      return React.createElement(this.component,
        { pathname: this.state.selfPathname,
          ...props,
          params: (this.state.cacheMatch && this.state.cacheMatch.matcher)? (this.state.cacheMatch.matcher.params || {}) : {}
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

if(__DEV__) {

  Route.propTypes = {
    component: React.PropTypes.any,
    loadComponent: React.PropTypes.any,
    enterFilter: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    leaveFilter: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    path: React.PropTypes.string,
    redirect: React.PropTypes.string,
    cache: React.PropTypes.any,
    index: React.PropTypes.any,
    miss: React.PropTypes.any,
    offDirtyCheck: React.PropTypes.any,
    children: React.PropTypes.any
  }
}

Route.contextTypes = {
  history: React.PropTypes.any,
  subscribe: React.PropTypes.any,
  parent: React.PropTypes.any
}

Route.childContextTypes = {
  parent: React.PropTypes.any
}

RouteBase(Route)
RouteCache(Route)
RouteFilter(Route)
RouteRedirect(Route)
// RouteMiss(Route)
