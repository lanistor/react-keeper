import React from 'react'
import ReactDOM from 'react-dom'
import Logger from '../utils/Logger'
import CacheOfTagControl from '../utils/CacheOfTagControl'
import CacheOfLinkControl from '../utils/CacheOfLinkControl'

export default (RouteBase) => class extends RouteBase {

  /** check 'cache' tag and link */
  isCached() {
    if(CacheOfTagControl.isCached(this)) {
      return 1
    }
    if(CacheOfLinkControl.isCached(this)) {
      return 2
    }
    return 0
  }

  /** check `cache` tag, used after route is mounted succeed */
  checkCacheTag(remove) {

    let cache
    if(remove) {
      cache = null
    }else {
      cache = typeof(this.cacheMark) !== 'undefined'? this.cacheMark : this.props.cache
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

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps)
    if(nextProps.cache !== this.props.cache) {
      this.cacheMark = nextProps.cache
      this.checkCacheTag(false)
      this.routeCheckEntry()
    }
  }

  /** check cache, link cache & tag cache */
  setToUnmount(matchData, options) {
    let cache = this.isCached()
    if(cache) {
      this.checkPath(this.cacheLocation)
      if(this.state.mountBy !== cache && this.state.status === 1) {
        super.setToUnmount(matchData, options)
        this.updateMountStatus({ status: 1, mountBy: cache, matchData: this.state.cacheMatch })
      }
      return
    }
    super.setToUnmount(matchData, options)
  }

  /** check cache tag after update status  */
  updateMountStatus({ status, mountBy, matchData }) {
    super.updateMountStatus({ status, mountBy, matchData })
    this.checkCacheTag(status===0)
  }

  /** hide or show it's component after it mounted */
  hideOrShow() {
    if(!this.state.status)
      return
    const display = this.state.mountBy === 0? (this.initDisplay || null) : 'none'
    let dom
    try{
      dom = this.refs.component? ReactDOM.findDOMNode(this.refs.component) : null
    }catch(error) {
      Logger.warn('Cannot find dom.')
      return
    }
    if(!dom) {
      Logger.warn('Cannot find dom.')
      return
    }

    // change display
    if(dom) {
      if(typeof this.initDisplay === 'undefined') {
        this.initDisplay = dom? (dom.style.display || null) : null
      }
      dom.style.display = display
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    this.checkCacheTag(true)
  }

  componentDidUpdate() {
    this.hideOrShow()
    super.componentDidUpdate && super.componentDidUpdate()
  }
  
}
