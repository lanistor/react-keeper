import React from 'react'
import HistoryControl from '../HistoryControl'

export default function(Route) {

  Route.prototype = Route.prototype || {}

  /** check 'enterFilter' */
  let _setToMount = Route.prototype.setToMount
  Route.prototype.setToMount = function(matchData ) {

    this.checkFilter(this.props.enterFilter, (passed)=> {
      if(!passed) {
        return
      }

      /** Step 3 : check 'redirect' props */
      const { redirect } = this.props
      if(redirect && typeof redirect === 'string') {
        HistoryControl.replace(redirect)
        return
      }

      _setToMount.call(this, matchData)
    })
  }
  
  /** check 'leaveFilter' tag and link */
  let _setToUnmount = Route.prototype.setToUnmount
  Route.prototype.setToUnmount = function(matchData ) {
    this.checkFilter(this.props.leaveFilter, (passed)=> {
      if(!passed) {
        return
      }
      _setToUnmount.call(this, matchData)
    })
  }


  /**
   * check filters
   * @param { Function or Array of function } filters : filters to check in order
   * @param { Function } callback(passed)
   *   @passed { Boolean } : pass result of filters
   */
  Route.prototype.checkFilter = (filters, callback)=> {
    if(!filters) {
      callback(true)
      return
    }
    if(!(filters instanceof Array)) {
      filters = [ filters ]
    }
    let tempFilters = []
    for(let i=0; i<filters.length; i++) {
      if(typeof filters[i] === 'function') {
        tempFilters.push(filters[i])
      }
    }
    filters = tempFilters

    if(filters.length === 0) {
      callback(true)
      return
    }

    let pointer = 0    // record the index of the running filter

    const filterCallback = ()=> {
      if(pointer === filters.length-1) {
        callback(true)
      }else{
        filters[ ++pointer ](filterCallback, this.props)
      }
    }

    filters[0](filterCallback, this.props)
  }
  
}
