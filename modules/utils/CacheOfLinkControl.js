/*
 * the cache of link controlle
 */

/**
 * clear cache route
 * 
 * two ways to call 'clear'
 *   - CacheLink click(also call history changed, but will reset targetPath=history.location)
 *   - history changed
 */
const clear = ()=> {
  targetPath = ''
  cacheStack = []
}

/** add cache route */
export const add = (srcRoute, _targetPath)=> {
  if(_targetPath !== targetPath) {
    clear()
  }
  if(!srcRoute || !_targetPath) {
    return
  }
  targetPath = _targetPath

  let children = srcRoute.children || []
  let endChild = null
  while(children.length > 0) {
    for(let i=0; i< children.length; i++) {
      endChild = children[i]
      if(endChild.status && endChild.mountBy===0) {
        break
      }
    }
    children = endChild.children || []
  }
  cacheStack.push(endChild || srcRoute)
}

/** history listener */
export const onHistoryChanged = (location)=> {

  // CacheLink‘s click will reset targetPath=location.pathname, so will not call clear twice.
  if(location.pathname !== targetPath) {
    clear()
  }
}

/** judge if route should cache */
export const isCached = (srcRoute) => {
  for(let route of cacheStack) {
    if(route === srcRoute) {
      return true
    }
  }
  return false
}

let cacheStack = []
let targetPath = ''

export default {
  add,
  isCached,
  onHistoryChanged
}
