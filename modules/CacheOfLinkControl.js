/*
 * the cache of link controlle
 */

/** clear cache route */
const clear = ()=> {
  targetPath = ''
  cacheStack = []
}

/** add cache route */
export const add = (srcRoute, _targetPath)=> {
  if(!srcRoute || !_targetPath) {
    return
  }
  targetPath = _targetPath
  cacheStack.push((srcRoute))
}

/** history listener */
export const onHistoryChanged = (location)=> {
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
