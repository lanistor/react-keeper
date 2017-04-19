import React from 'react'
import Link from './Link'
import CacheOfLinkControl from './CacheOfLinkControl'
import HistoryControl from './HistoryControl'

export default class CacheLink extends Link {

  static contextTypes = {
    history: React.PropTypes.any,
    routes: React.PropTypes.any
  }
  render() {
    return super.render()
  }
}

CacheLink.prototype.go = function(to, state) {
  let route
  if(this.context.routes && this.context.routes.length) {
    route = this.context.routes[this.context.routes.length-1]
  }
  CacheOfLinkControl.add(this.context.routes && this.context.routes.length &&
    this.context.routes[this.context.routes.length-1], to)
  HistoryControl.go(to, state)
}
