import React from 'react'
import ReactDOM from 'react-dom'
import Logger from './Logger'
import matchPath from './match/matchPath'
import { resetPath, objectWithoutProperties, isStatelessComponent } from './Util'
import RouteMatchGroupControl from './RouteMatchGroupControl'
import CacheOfTagControl from './CacheOfTagControl'
import CacheOfLinkControl from './CacheOfLinkControl'

export default class RouteUtil extends React.Component {

  /** check 'cache' tag and link */
  isCached = ()=> {
    if(CacheOfLinkControl.isCached(this)) {
      return 2
    }
    if(CacheOfTagControl.isCached(this)) {
      return 1
    }
    return 0
  }

  /** check cache tag, used after route is mounted succeed */
  checkCacheTag = (remove)=> {
    let cache
    if(remove) {
      cache = null
    }else {
      cache = this.props.cache
      if(!cache) {
        cache = null
      }
      if(cache !== 'parent' && cache !== 'root') {
        cache = null
      }
    }
    CacheOfTagControl.put(this, cache)
  }

  /** update match group, used after route is mounted succeed */
  updateMatchedGroup = ()=> {
    RouteMatchGroupControl.updateGroup(this)
  }

  /** check if the last matched route is it's parent */
  checkParent = ()=> {
    return RouteMatchGroupControl.parentCheck(this)
  }

  /** get parents' matched path */
  getParentPath = ()=> {
    let paths = []
    for(let route of this.context.routes) {
      if(route.matcher)
        paths.push(route.matcher.matchStr)
    }
    return paths.join('')
  }

  /** getSelfPath */
  getSelfPath = ()=> {
    let paths = [ this.getParentPath() ]
    if(this.matcher)
      paths.push(this.matcher.matchStr)
    return paths.join('')
  }

  /**
   * check path match
   * 1. direct match
   * 2. 'index' match
   */
  checkPath = (location)=> {

    let { path: pattern, index } = this.props
    if(!pattern) {
      return false
    }
    pattern = resetPath(pattern)

    let { pathname } = location || {}
    if(typeof pathname === 'undefined') {
      return false
    }
    pathname = resetPath(pathname)

    let parentPath = this.getParentPath()

    let checkPathname = pathname
    if(parentPath) {
      checkPathname = pathname.substring(parentPath.length)
    }

    let matcher = matchPath(checkPathname, pattern)
    this.matcher = matcher

    if(matcher.match) {
      return true
    }

    if(index) {
      if(pathname === parentPath) {
        return true
      }
    }

    return false
  }

  /** load component, contains dynamic component */
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

  /** after check miss succeed */
  checkMissSucceed = ()=> {
    this.updateMatchedGroup()
    this.setToMount()
    this.cacheSaveLocation()
  }

  /** save 'location' as cache */
  cacheSaveLocation = ()=> {
    this.cacheLocation = Object.assign({}, this.context.history.location)
  }

  /** check 'miss' tag */
  checkMiss = ()=> {
    let { miss } = this.props
    if(!miss) {
      return
    }
    setTimeout(()=> {
      if(!RouteMatchGroupControl.parentCheck(this)) {
        return
      }
      this.checkMissSucceed()
    }, 0)

  }

  /** hide or show it's component after it mounted */
  hideOrShow = ()=> {
    const display = this.state.mountBy === 0? (this.initDisplay || null) : 'none'
    let dom
    try{
      dom = this.refs.component? ReactDOM.findDOMNode(this.refs.component) : null
    }catch(error) {
      Logger.warning('Cannot find dom.')
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
}
