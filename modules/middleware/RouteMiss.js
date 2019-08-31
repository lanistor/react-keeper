import React from 'react'
import { resetPath } from '../utils/Util'

export default (RouteBase) => class extends RouteBase {

  /** check 'miss' tag */
  checkMissTag = ()=> {
    let { miss } = this.props

    if(!miss) {
      return
    }
    window.clearTimeout(this.missTimer)
    this.missTimer = setTimeout(()=> {
      this.checkMissMatch()
    }, 0)
  }

  setToMatch(matchData, options) {
    this.addToParent()
    super.setToMatch(matchData, options)
  }

  setToUnmount( matchData, options) {
    this.removeFromParent()
    super.setToUnmount(matchData, options)
    this.checkMissTag()
  }

  componentWillUnmount() {
    window.clearTimeout(this.missTimer)
    this.removeFromParent()
    super.componentWillUnmount && super.componentWillUnmount()
  }

  /** add this to parent' cached children list */
  addToParent() {
    let parent = this.getParentRoute()
    if(!parent) return
    if(!parent.children) {
      parent.children = []
    }
    for(let i=0; i<parent.children.length; i++) {
      if(parent.children[i] === this) {
        return
      }
    }
    parent.children.push(this)
  }

  /** remove this from parent' cached children list */
  removeFromParent() {
    let parent = this.getParentRoute()
    if(!parent || !parent.children || !parent.children.length) return
    for(let i=0; i<parent.children.length; i++) {
      if(parent.children[i] === this) {
        parent.children.splice(i, 1)
        break
      }
    }
  }

  /**
   * 'miss' property support
   * when no component matched, this one will match if condition
   */
  checkMissMatch() {
    let parent = this.getParentRoute()
    if(!parent) {
      return
    }
    if(!parent.children || !parent.children.length) {
      let parentPath = this.getParentPath()
      let { pathname } = this.context.history.getCurrentLocation() || {}
      
      this.setToMatch({
        match: true,
        matcher: {
          pattern: null,
          match: true,
          params: {},
          matchStr: pathname && resetPath(pathname).substring(parentPath.length),
          lastIndex: 0
        }
      }, this.getMatchOptions(true))
    }
  }

  /** get parent */
  getParentRoute() {
    return this.context.parent || this.context.router
  }
}
