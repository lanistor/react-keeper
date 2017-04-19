# Versions

## V2.0
V2.0 had published at 2017-4-19, Here are what we did.  
- Add `state` to HashRouter.
- Add `state` property to **Link** and **CacheLink**, which can be readed by `Control.state`.
- Change base library to `vhistory`(`history` before).
- HashRouter can auto use random key to url when browser doesn't support state API.

## V1.X
React-Keeper is a routing library of React, like React-Router, but stronger.  
- Pages Cache.
- Extensible Route config.
- Enter filter and leave filter to fit truely project.
- Use tags to config: `index`, `miss`, `cache` and so on.
- Flexible config of Route, Link, CacheLink.
- Dirty check of Route Component.