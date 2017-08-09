import React from 'react'

import RouteBase from './RouteBase'
import RouteIndex from './middleware/RouteIndex'
import RouteCache from './middleware/RouteCache'
import RouteFilter from './middleware/RouteFilter'
import RouteRedirect from './middleware/RouteRedirect'
import RouteMiss from './middleware/RouteMiss'

export default class Route extends RouteMiss(RouteCache(RouteRedirect(RouteFilter(RouteIndex(RouteBase))))) { }
