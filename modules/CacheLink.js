import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import CacheOfLinkControl from './utils/CacheOfLinkControl'
import HistoryControl from './HistoryControl'

export default class CacheLink extends Link {

  static contextTypes = {
    history: PropTypes.object
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
