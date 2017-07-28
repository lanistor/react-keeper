import React from 'react'
import functional from 'react-functional'
import HistoryControl from '../HistoryControl'
import matchPath from '../match/matchPath'
import { resetPath, isStatelessComponent } from '../Util'

export default function(Route) {

  Route.prototype = Route.prototype || {}

  /** get parents' matched path */
  Route.prototype.getParentPath = function() {
    let paths = []
    let rou = this
    let path
    while(rou.context.parent) {
      if(rou.context.parent.state.cacheMatch
          && rou.context.parent.state.cacheMatch.matcher) {
        path = rou.context.parent.state.cacheMatch.matcher.matchStr
        if(path && path.indexOf('/')!==0) {
          path = '/' + path
        }
        paths.push(path)
      }
      rou = rou.context.parent
    }

    return paths.join('').replace(/[/]{2,}/g, '/')
  }

  /** getSelfPath */
  Route.prototype.getSelfPath = function(matcher) {
    let paths = [ this.getParentPath() ]
    if(matcher)
      paths.push(matcher.matchStr)
    return paths.join('').replace(/[/]{2,}/g, '/')
  }

  /**
   * check path match
   * 1. direct match
   * 2. 'index' match
   */
  Route.prototype.checkPath = function(location) {

    let { path: pattern, index } = this.props

    let { pathname } = location || {}
    if(typeof pathname === 'undefined') {
      return { match: false }
    }
    pathname = resetPath(pathname)
    let parentPath = this.getParentPath()

    if(!pattern) {
      if(index) {
        if(pathname === resetPath(parentPath)) {
          return { match: true, matcher: matcher }
        }
      }
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

    if(index) {
      if(pathname === resetPath(parentPath)) {
        return { match: true, matcher: matcher }
      }
    }

    return { match: false }
  }

  /** load component, contains dynamic component */
  Route.prototype.loadComponent = function(callback) {
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
  
}
