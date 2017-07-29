import React from 'react'
import HistoryControl from '../HistoryControl'

export default (RouteBase) => class extends RouteBase {

  /** check 'redirect' props */
  updateMountStatus({ status, mountBy, matchData }) {

    const { redirect } = this.props
    if(redirect && typeof redirect === 'string') {
      HistoryControl.replace(redirect)
      return
    }

    super.updateMountStatus({ status, mountBy, matchData })
  }
  
}
