/*
 * RouteMatchGroupControl
 * [ the route matched group controller ]
 */

let groupLast = {}
let lastGroupCode = ''

export const historyChanged = ()=> {
  groupLast = {}
}

const getGroupCode = (route) => {
  return route.context.groupCode || route.groupCode
}

export const updateGroup = (route) => {
  lastGroupCode = getGroupCode(route)
  groupLast[lastGroupCode] = route
}

export const getLastRoute = (route) => {
  const routes = route.context.routes
  if(routes && routes.length) {
    return groupLast[ getGroupCode(routes[ routes.length-1 ]) ]
  }
  return groupLast[ lastGroupCode ]
}

export const parentCheck = (child) => {
  const lastRoute = groupLast[getGroupCode(child)]
  if(!lastRoute) {
    return true
  }
  if(!child.context.routes || !child.context.routes.length) {
    return false
  }
  return child.context.routes[child.context.routes.length-1] === lastRoute
}

export default {
  historyChanged,
  updateGroup,
  parentCheck,
  getLastRoute
}
