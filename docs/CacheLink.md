# CacheLink
## Introduction
Inherit from `Link` Component, use to cache pages temporarily.
When you use `CacheLink` to open a page, the source page will be cached temporarily, and the cache will not be cleaned until the location is changed.  

## API
`CacheLink` has the same usage of [Link](Link.md). 

## Example
Use `CacheLink` to open a new page in your list pages, then the list page will hold it's state, and when location is back, you can continue your operation.


## Warning
CacheLink depend on `ReactMiss` middleware, which is integrated with `default Route`. If you are using your custom `Route`, let it inherit from `ReactMiss`: [Custom Route](./CustomRoute.md).    
