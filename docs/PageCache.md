# Page Cache
Cache pages after they are mounted.  
You have two ways to use `Cache System` in **React-Keeper**.
## Use `cache` Tag
You can add `cache` property to your `Route` component, to cache a page temporarily or always.  
Such as:
```
<HashRouter>
  <div>
    <Route cache component={Home} path='/'/>

    <Route component={Host} path='/host' />

    <Route cache='parent' path='/aboutus' component={AboutUs}/>

  </div>
</HashRouter>
```
In the upper code, the page `Home` will bean cached(always), and the page `AboutUs` will be cached(temporarily).  

`cache` tag supports two values: `root`(default), `parent`.  
`cache='root'`( or `cache` ) will cache a page always, the page will be cached until the Router is unmounted.  
`cache='parent'` will cache a page temporarily, the page will be cached until it's parent component is unmounted.  

## Use `CacheLink`
Learn to use [CacheLink](CacheLink.md)
