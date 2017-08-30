import React from 'react'
import PropTypes from 'prop-types'
import functional from './utils/functional'
import InnerRouter from './InnerRouter'
import { shouldMatch, addMatch, removeMatch, getMatchedPath, getSelfPathname } from './utils/RouteControl'
import HistoryControl from './HistoryControl'
import matchPath from './match/matchPath'
import { resetPath, compare, objectWithoutProperties, isStatelessComponent, isMountedComponent } from './utils/Util'
import Logger from './utils/Logger'

export default class RouteBase extends React.PureComponent {

  constructor(...args) {
    super(...args)

    this.state = {
      status: 0,        // 0: unmount, 1: mounted
      mountBy: 0        // 0: mount by route or none, 1: mount by 'cache', 2: mount by 'CacheLink'
    }
    this.unsubscribe = this.context.subscribe(this.locationChanged)

    this.matcher = null   // dont use state to save matcher, for state will change after component is mounted.
    this.component = null

    if(!this.context.history) {
      throw new Error('Route must be used in Router Component ( HashRouter,BrowserRouter or MemoryRouter )!')
    }
  }

  /** location change listener */
  locationChanged = ()=> {
    this.routeCheckEntry()
  }

  componentDidMount() {
    this.locationChanged()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  getChildContext() {
    return {
      parent: this
    }
  }

  /** dirty check */
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
   * entry of check
   * compute route mount's state
   */
  routeCheckEntry () {
    let matchData = this.checkPath(this.context.history.getCurrentLocation() || {})

    if(matchData.match) {
      this.setToMatch(matchData)
    }else {
      this.setToUnmount(matchData)
    }
  }

  /** set state to match */
  setToMatch (matchData) {
    this.loadComponent((succeed, component)=> {
      if(!succeed) {
        return
      }

      this.setToMount(matchData)

    })
  }

  /**
   * set to mount state
   * (also invoke by outside)
   */
  setToMount (matchData) {
    this.updateMountStatus({ status: 1, matchData })
  }

  /**
   * set to unmount state
   */
  setToUnmount(matchData) {
    this.updateMountStatus({ status: 0 })
  }

  /** update bind state */
  updateMountStatus({ status, mountBy, matchData }) {
    if(!isMountedComponent(this)) {
      return
    }

    if(typeof mountBy === 'undefined' || mountBy === null) {
      mountBy = 0
    }

    this.matcher = matchData
    if(status === 1) {
      this.setState({
        status,
        mountBy,
        selfPathname: this.getSelfPath(matchData && matchData.matcher)
      })
    }else{
      this.setState({ status, mountBy })
    }
  }

  /** get parents' path */
  getParentPath() {
    let paths = []
    let rou = this
    let path
    while(rou.context.parent) {
      if(rou.context.parent.matcher
          && rou.context.parent.matcher.matcher) {
        path = rou.context.parent.matcher.matcher.matchStr
        if(path && path.indexOf('/')!==0) {
          path = '/' + path
        }
        paths.unshift(path)
      }
      rou = rou.context.parent
    }

    return paths.join('').replace(/[/]{2,}/g, '/')
  }

  /** getSelfPath */
  getSelfPath(matcher) {
    return `${this.getParentPath()}${matcher? matcher.matchStr : ''}`.replace(/[/]{2,}/g, '/')
  }

  /** check path match */
  checkPath(location) {

    let { path: pattern } = this.props

    let { pathname } = location || {}
    if(typeof pathname === 'undefined') {
      return { match: false }
    }
    pathname = resetPath(pathname)
    let parentPath = this.getParentPath()

    if(!pattern) {
      return { match: false }
    }
    pattern = resetPath(pattern)

    let checkPathname = pathname
    if(parentPath) {
      checkPathname = pathname.substring(parentPath.length)
    }

    let matcher = matchPath(checkPathname, pattern)

    if(matcher.match) {
      return { match: true, matcher: matcher }
    }
    return { match: false }
  }

  /** load component, contains dynamic component */
  loadComponent(callback) {
    if(this.component) {
      callback(true, this.component)
      return
    }
    let { component, loadComponent: dynamicComponent } = this.props
    if(component) {
      this.component = component? (isStatelessComponent(component)?  functional({ render: component }) : component) : null
      callback(true, this.component)
      return
    }
    if(dynamicComponent) {
      dynamicComponent((comp)=> {
        this.component = comp? (isStatelessComponent(comp)?  functional({ render: comp }) : comp) : null
        callback(true, this.component)
      })
      return
    }
    callback(true, null)
  }

  /** render */
  render() {

    /** 1. unmount state */
    if(this.state.status === 0) {
      return null
    }

    const children = this.props.children

    /** mount state */
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
          params: (this.matcher && this.matcher.matcher)? (this.matcher.matcher.params || {}) : {}
        }, children)
    }
    if(React.isValidElement(children)) {
      return React.cloneElement(React.Children.only(children), { ref: 'component' })
    }
    Logger.error('When `Route` component has no component property, it\'s children must be a single tag (not an array), like `div`|`view` .')
    return null
  }
  
}

if(__DEV__) {

  RouteBase.propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    loadComponent: PropTypes.func,
    enterFilter: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func
    ]),
    leaveFilter: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func
    ]),
    path: PropTypes.string,
    redirect: PropTypes.string,
    cache: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    index: PropTypes.bool,
    miss: PropTypes.bool,
    offDirtyCheck: PropTypes.bool,
    children: PropTypes.any
  }
}

RouteBase.contextTypes = {
  history: PropTypes.object,
  subscribe: PropTypes.func,
  parent: PropTypes.instanceOf(RouteBase),
  router: PropTypes.any
}

RouteBase.childContextTypes = {
  parent: PropTypes.instanceOf(RouteBase)
}
