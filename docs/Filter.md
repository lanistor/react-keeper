# Filter

Filter is a hook before a component enters(or leaves). React-Keeper supports two filters: `Enter Filter` and `Leave Filter`.  
`Enter filters`, filters run before a route mount succeed, such as : login's check.
`Leave filters`, filters run before a route unmount succeed, such as : unsubmited form data.

## Usage
### Define a Filter
* Define a fllter, and run over it or not.
```javascript
// receive 'props' from React-Control
const loginFilter = (callback, props)=> {

  if(!props.host) {

    // dynamicly request data (use jQuery ajax)
    $.ajax({
      url: 'host/login.do',
      data: {},
      succeed: function(data){
        if(data.host){

          // run 'callback' function to enter next step (render component or next filter)
          callback()            
        }
      },
      error: function(){

      },
      dataType: 'json'
    })
  }
}
```
### Added to Route Component
* Single Filter
```javascript
<HashRouter>
  <Route path='/user' component={User} enterFilter={ loginFilter } leaveFilter={(cb)=>{ alert('will not leave') }} />
</HashRouter>
```
* Multiple Filters
```javascript
<HashRouter>
  <Route path='/user' component={User} enterFilter={[ loginFilter, permitFilter1, permitFilter2 ] } />
</HashRouter>
```
