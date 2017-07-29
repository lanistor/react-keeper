import React from 'react'

import RouteBase from './middleware/RouteBase'
import RouteCache from './middleware/RouteCache'
import RouteFilter from './middleware/RouteFilter'
import RouteRedirect from './middleware/RouteRedirect'
// import RouteMiss from './middleware/RouteMiss'

export default class Route extends RouteCache(RouteRedirect(RouteFilter(RouteBase))) { }
