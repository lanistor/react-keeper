import React from 'react'
import HistoryControl from '../HistoryControl'

export default (RouteBase)=> class extends RouteBase {

  constructor(...args) {
    super(...args)
  }

  setToMount(matchData) {
    this.checkFilter(this.props.enterFilter, (passed)=> {
      if(!passed) {
        return
      }
      super.setToMount(matchData)
    })
  }

  /** check 'leaveFilter' tag and link */
  setToUnmount (matchData) {
    this.checkFilter(this.props.leaveFilter, (passed)=> {
      if(!passed) {
        return
      }
      super.setToUnmount(matchData)
    })
  }


  /**
   * check filters
   * @param { Function or Array of function } filters : filters to check in order
   * @param { Function } callback(passed)
   *   @passed { Boolean } : pass result of filters
   */
  checkFilter(filters, callback) {
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
