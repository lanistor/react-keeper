# Router
React-Keeper supports three types of router: HashRouter, BrowserRouter, MemoryRouter, and they has the same usage.  
```
<HashRouter>
  <div>
    <Route path='/home' component={Home} />
    <Route path='/user/:userId' component={User} />
  </div>
</HashRouter>
```

## HashRouter
Use hash value as the path.  
HashRouter supports `basename`, which change the base path of the router.

## BrowserRouter
Use browser location as the path.  
HashRouter supports `basename`, which change the base path of the router.

## MemoryRouter
User memory to control the path.
