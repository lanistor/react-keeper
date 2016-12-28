
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

/** check if route is cached */
export const isCached = (route)=> {
  for(let item of cachedRoute) {
    if(item.route === route) {
      return true
    }
    if(item.rule === 'root' && item.route.context.routes) {
      for(let innerItem of item.route.context.routes) {
        if(innerItem === route) {
          return true
        }
      }
    }
  }
  return false
}

/** clear cached route */
// export const clear = ()=> {
//   cachedRoute.length = 0
// }

export default {
  put,
  isCached
}
