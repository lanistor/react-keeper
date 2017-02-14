# CacheLink
Inherit from `Link` Component, use to cache pages temporarily.  
`CacheLink` has the same usage of [Link](Link.md), the difference is that, when you use `CacheLink` to open a page, the source page will be cached temporarily, and the cache will not be cleaned until the location is back.  
Use `CacheLink` to open a new page in your list pages, then the list page will hold it's state, and when location is back, you can continue your operation.
