# Custom Route Component
## Custom Route
  Create your own Route component as you need, you can combine any middlewares in your own Route Component. 
  ```js
  import React from 'react'

  import RouteBase from 'react-keeper/RouteBase'
  import RouteIndex from 'react-keeper/middleware/RouteIndex'
  import RouteCache from 'react-keeper/middleware/RouteCache'
  import RouteFilter from 'react-keeper/middleware/RouteFilter'
  import RouteRedirect from 'react-keeper/middleware/RouteRedirect'
  import RouteMiss from 'react-keeper/middleware/RouteMiss'

  export class MyRoute1 extends RouteMiss(RouteCache(RouteRedirect(RouteFilter(RouteIndex(RouteBase))))) { }
  export class MyRoute2 extends RouteCache(RouteRedirect(RouteFilter(RouteIndex(RouteBase)))) { }
  export class MyRoute3 extends RouteMiss(RouteCache(RouteIndex(RouteBase))) { }
  export class MyRoute4 extends RouteIndex(RouteBase) { }
  ```  

  Then use like this:  
  ```js
    <MyRoute1 path='/home' componnet={ Home}/>
  ```
  
## Middlewares  

  | Middlewares   | Description                  |  
  | ----          | ----                         |  
  | RouteBase     | base code of Route Component |  
  | RouteCache    | cache middleware |  
  | RouteFilter   | enterFilter and leaveFilter middleware |  
  | RouteMiss     | miss tag middleware|  
  | RouteIndex    | index tag middleware |  
  | RouteRedirect | redirect tag middleware |  
  

## The default Route Component is: 
  ```js
  export default class Route extends RouteMiss(RouteCache(RouteRedirect(RouteFilter(RouteIndex(RouteBase))))) { }
  ```