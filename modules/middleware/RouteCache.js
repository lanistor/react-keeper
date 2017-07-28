import React from 'react'
import ReactDOM from 'react-dom'
import Logger from '../Logger'
import CacheOfTagControl from '../CacheOfTagControl'
import CacheOfLinkControl from '../CacheOfLinkControl'

export default function(Route) {

  Route.prototype = Route.prototype || {}

  /** check 'cache' tag and link */
  Route.prototype.isCached = function() {
    if(CacheOfTagControl.isCached(this)) {
      return 1
    }
    if(CacheOfLinkControl.isCached(this)) {
      return 2
    }
    return 0
  }

  /** check `cache` tag, used after route is mounted succeed */
  Route.prototype.checkCacheTag = function(remove) {
    console.log('==check cache tag==', remove, this.props.cache, this.props.path)
    let cache
    if(remove) {
      cache = null
    }else {
      cache = this.props.cache
      if(!cache) {
        cache = null
      }
      if(cache === true) {
        cache = 'root'
      }
      if(cache !== 'parent' && cache !== 'root') {
        cache = null
      }
    }
    CacheOfTagControl.put(this, cache)
  }

  /** check cache, link cache & tag cache */
  let _setToUnmount = Route.prototype.setToUnmount
  Route.prototype.setToUnmount = function(matchData) {

    let cache = this.isCached()
    if(cache) {
      this.checkPath(this.cacheLocation)
      if(this.state.mountBy !== cache && this.state.status === 1) {

        this.updateMountStatus({ status: 1, mountBy: cache, matchData: this.state.cacheMatch })
      }
      return
    }
    _setToUnmount.call(this, matchData)
  }

  /** check cache tag after update status  */
  let _updateMountStatus = Route.prototype.updateMountStatus
  Route.prototype.updateMountStatus = function({ status, mountBy, matchData }) {
    console.log('|| updateMountStatus ||', status, this.props.path)
    _updateMountStatus.call(this, { status, mountBy, matchData })
    this.checkCacheTag(status===0)
  }

  /** hide or show it's component after it mounted */
  Route.prototype.hideOrShow = function() {
    const display = this.state.mountBy === 0? (this.initDisplay || null) : 'none'
    let dom
    try{
      dom = this.refs.component? ReactDOM.findDOMNode(this.refs.component) : null
    }catch(error) {
      Logger.warning('Cannot find dom.')
      return
    }
    if(!dom) {
      if(React.isValidElement(this.props.children)) {
        dom = this.props.children[0]
      }
    }

    // change display
    if(dom) {
      if(typeof this.initDisplay === 'undefined') {
        this.initDisplay = dom? (dom.style.display || null) : null
      }
      dom.style.display = display
    }
  }
  
}
