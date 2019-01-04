# Route
## Component
  Use component property to define the component to render.  
  ```javascript
  <HashRouter>
    <div className='page-group'>
      <Route index path='/monitor' component={ Monitor } />
      <Route path='/mine' component={ Mine } />
    </div>
  </HashRouter>
  ```
  * Extensible Component  
    You can use `Route` component ***anywhere, anytime***.
    ```javascript
    import User from './User.js'

    <HashRouter>
      <div className='page-group'>
        <Route index path='/' component={ Home } />
        <Route path='/user' component={ User } />
      </div>
    </HashRouter>


    // User.js
    export default function Mine(){
      return (
        <div>
          <Route path='/info' component={ Info } />
          <Route path='/edit' component={ Edit } />
        </div>
      )
    }
    ```

## Dynamic Component  
  If we want to load `Products` component dynamicly, we can config like this:
  ```javascript
    <Route loadComponent={ (cb)=>{
        import('../Products.js').then((Products)=>{
          cb(Products)
        })
      } } path='/user'>
  ```
  Then, when this Route Component matched, the `Products.js` will load.
## Filters  
  Filters lead you to add your own fliter function before(or after) a component mount(or unmount).
  ```javascript
  <Route component={ User } path='/user' enterFilter={ [ loginCheck, permitCheck ] }>
    <Route index component={ Info } path='/info'/>
    <Route component={ Edit } path='/edit' leaveFilter={ editLeave }/>
   </Route>

   // login check
   const loginCheck = (cb, props)=> {
     if(props.user) {
       cb()
     }
   }

   // resource visit permited
   const permitCheck = (cb, props)=> {
     if(props.permit) {
       cb()
     }
   }

   // leave filter
   const editLeave = (cb, props)=> {
     if(window.confirm('Are you sure to leave?', ()=> {
       cb()
     }))
   }
  ```

## Index Component  
  * Add `'index'` property to Route component, when path is equals to parent component's path,this one will match and mount.
  ```javascript
  <Route component={ User } path='/user'>
    <Route index component={ Info } path='/info'/>
    <Route component={ Edit } path='/edit'/>
    <Route component={ Article } path='/user'/>
   </Route>
  ```
   *`'indexv` component can no use `'path'` property*
## Miss Match Deal  
  * When no component is matched, we should show users something, such as `404` page. we support two way for this scene.
  - use `'miss'` property
  ```javascript
   <Route component={ User } path='/user'>
     <Route component={ Edit } path='/edit'/>
     <Route component={ Article } path='/user'/>
     <Route component={ NotFound } miss/>
   </Route>
  ```
  *`'miss'` component can no use `'path'` property*

  - use `'*'` path property, and add it as the last child
  ```javascript
   <Route component={ User } path='/user'>
     <Route component={ Edit } path='/edit'/>
     <Route component={ Article } path='/user'/>
     <Route component={ NotFound } path='*'/>
   </Route>
  ```

## Children
Write children in Route, you can embed code in Route Component (no `render` function), such as:  
  ```
  <Route path='/detail'>
    <div>
      Content embed
    </div>
  </Route>
  ```
