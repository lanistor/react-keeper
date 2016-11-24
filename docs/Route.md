# Route
## path
## component
  * normal component
  * dynamic component 
## index component
  * add 'index' property to Route component, when no Route matched, this one will match and mount.
  ```
  <Route component={ User } path='/user'>
    <Route index component={ Info } path='/info'/>
    <Route component={ Edit } path='/edit'/>
    <Route component={ Article } path='/user'/>
   </Route>
  ```
## no match deal
  - use 'index' property
  - use '*' path and add it as the last child
  ```
   <Route component={ User } path='/user'>
     <Route component={ Edit } path='/edit'/>
     <Route component={ Article } path='/user'/>
     <Route component={ Info } path='*'/>
   </Route>
  ```
## blocked pages
