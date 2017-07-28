import React from 'react'
import HistoryControl from '../HistoryControl'

export default function(Route) {

  Route.prototype = Route.prototype || {}

  /** check 'redirect' props */
  let _updateMountStatus = Route.prototype.updateMountStatus
  Route.prototype.updateMountStatus = function({ status, mountBy, matchData }) {

    const { redirect } = this.props
    if(redirect && typeof redirect === 'string') {
      HistoryControl.replace(redirect)
      return
    }

    _updateMountStatus.call(this, { status, mountBy, matchData })
  }
  
}
