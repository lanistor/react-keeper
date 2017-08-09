import React from 'react'
import { resetPath } from '../utils/Util'

export default (RouteBase)=> class extends RouteBase {

  /** check 'index' tag */
  checkPath(location) {
    let matchData = super.checkPath(location)
    if(matchData.match) {
      return matchData
    }
    let { path: pattern, index } = this.props
    let { pathname } = location || {}

    if(!index || typeof pathname === 'undefined') {
      return { match: false }
    }

    if(index && resetPath(pathname) === resetPath(this.getParentPath())) {
      return { match: true }
    }

    return { match: false }
  }
}
