import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import CacheOfLinkControl from './utils/CacheOfLinkControl'
import HistoryControl from './HistoryControl'

export default class CacheLink extends Link {

  render() {
    return super.render()
  }
}

CacheLink.prototype.go = function(to, state) {
  let route
  if(this.context.routes && this.context.routes.length) {
    route = this.context.routes[this.context.routes.length-1]
  }
  CacheOfLinkControl.add(this.context.parent || this.context.router, to)
  HistoryControl.go(to, state)
}

CacheLink.contextTypes = {
  history: PropTypes.object,
  parent: PropTypes.any,
  router: PropTypes.any
}
