import React from 'react'

export default (RouteBase) => class extends RouteBase {

  /** after check miss succeed */
  checkMissSucceed () {
    this.setToMount()
    this.resetChildContext(true)
  }

  /** check 'miss' tag */
  checkMiss = ()=> {
    let { miss } = this.props
    if(!miss) {
      return
    }
    setTimeout(()=> {
      if(!this.checkParent()) {
        return
      }
      this.checkMissSucceed()
    }, 0)

  }

  /**
   * 'miss' property support
   * when no component matched, this one will match if condition
   * the condition is 'when no matched, it's parent is last matched one'
   */
  checkMissMatch(child) {
    const parent = routeMatch.length>0? routeMatch[0] : ''
    if(!child) {
      return
    }
    setTimeout(()=> {
      if(routeMatch.length===0) {
        if(parent === '') {
          child.setToMount()
        }
        return
      }
      if(routeMatch[routeMatch.length-1] === parent) {
        child.setToMount()
        return
      }
    }, 0)
  }
}