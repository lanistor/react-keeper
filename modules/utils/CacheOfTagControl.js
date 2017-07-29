
const cachedRoute = [
  /**
   * {
   *   route: { Route Component}      // the component of route
   *   rule: { string }               // the rule : ''
   * }
   */
]

/** add(or delete when rule is null) cached route to array */
export const put = (route, rule)=> {
  let index = 0
  for(let item of cachedRoute) {
    if(item.route === route) {
      if(rule) {
        item.rule = rule
      }else {
        cachedRoute.splice(index, 1)
      }
      return
    }
    index ++
  }
  if(rule)
    cachedRoute.push({ route, rule })
}

let _tempRoute
let _tempIsEnd

/** check if route is cached */
export const isCached = (route)=> {
  for(let item of cachedRoute) {
    if(item.route === route) {
      return true
    }
    _tempRoute = item.route.context.parent
    _tempIsEnd = item.rule === 'parent'
    while(_tempRoute) {
      if(_tempRoute === route) {
        return true
      }
      _tempRoute = _tempIsEnd? null : _tempRoute.context.parent
    }
  }
  return false
}

export default {
  put,
  isCached
}
