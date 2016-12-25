import React from 'react'
import Link from './Link'
import CacheOfLinkControl from './CacheOfLinkControl'
import RouteMatchGroupControl from './RouteMatchGroupControl'
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

CacheLink.prototype.go = function(to) {

  CacheOfLinkControl.add(RouteMatchGroupControl.getLastRoute(this), to)
  HistoryControl.go(to)
}
