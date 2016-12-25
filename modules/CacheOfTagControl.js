
const cachedRoute = [
  /**
   * {
   *   route: { Route Component}      // the component of route
   *   rule: { string }               // the rule : ''
   * }
   */
]

/** add(or delete when rule is null) cached route to array */
export const add = (route, rule)=> {
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
  cachedRoute.push(route)
}

/** check if route is cached */
export const isCached = (route)=> {
  for(let item of cachedRoute) {
    if(item === route) {
      return true
    }
    if(item.rule === 'root' && item.context.routes) {
      for(let innerItem of item.context.routes) {
        if(innerItem === route) {
          return true
        }
      }
    }
  }
  return false
}

/** clear cached route */
export const clear = ()=> {
  cachedRoute.length = 0
}

export default {
  add,
  isCached,
  clear
}
