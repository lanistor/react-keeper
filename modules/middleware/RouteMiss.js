import React from 'react'

export default function(Route) {

  Route.prototype = Route.prototype || {}

  /** after check miss succeed */
  Route.prototype.checkMissSucceed = ()=> {
    this.setToMount()
    this.resetChildContext(true)
  }

  /** check 'miss' tag */
  Route.prototype.checkMiss = ()=> {
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
  Route.prototype.checkMissMatch = (child) => {
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