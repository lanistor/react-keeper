# React Keeper Versions

## V2.1
V2.1 had published at 2017-08-09, here are what we did.  
- Add cache reset( clear or recache) to Route Component. [Cache Reset](PageCache.md)
- Split modules' code as middlewares, now you can create your own Route Component. [Custom Route](CustomRoute.md)

## V2.0
V2.0 had published at 2017-04-19, here are what we did.  
- Add `state` to [HashRouter](Router.md).
- Add `state` property to [Link](Link.md) and [CacheLink](CacheLink.md), which can be readed by [Control.state](Control.md).
- Change base library to `vhistory`(`history` before).
- HashRouter can auto add random key to url when browser doesn't support state API(default no key).

## V1.X
React-Keeper is a routing library of React, like React-Router, but stronger.  
- Pages Cache.
- Extensible Route config.
- Enter filter and leave filter to fit truely project.
- Use tags to config: `index`, `miss`, `cache` and so on.
- Flexible config of Route, Link, CacheLink.
- Dirty check of Route Component.
