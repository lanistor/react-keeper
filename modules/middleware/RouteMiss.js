import React from 'react'
import { isMountedComponent } from '../utils/Util'

export default (RouteBase) => class extends RouteBase {

  /** check 'miss' tag */
  checkMissTag = ()=> {
    let { miss } = this.props

    if(!miss) {
      return
    }
    setTimeout(()=> {
      this.checkMissMatch()
    }, 0)
  }

  setToUnmount( matchData ) {
    super.setToUnmount()
    this.checkMissTag()
  }

  /** check 'miss' tag after update status  */
  updateMountStatus({ status, mountBy, matchData }) {
    if(status && !mountBy) {
      this.addToParent()  // not cached Route
    }else {
      this.removeFromParent()
    }
    super.updateMountStatus({ status, mountBy, matchData })
  }

  componentWillUnmount() {
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
    if(!isMountedComponent(this)) {
      return
    }
    let parent = this.getParentRoute()
    if(!parent) {
      return
    }
    if(!parent.children || !parent.children.length) {
      this.loadComponent((succeed, component)=> {
        if(!succeed) {
          return
        }

        this.setToMount()
      })
    }
  }

  /** get parent */
  getParentRoute() {
    return this.context.parent || this.context.router
  }
}
