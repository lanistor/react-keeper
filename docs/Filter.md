# Filter
## Define a Filter
* Define a fllter, and run over it or not.
```
// receive 'props' and 'context' from React-Control
const loginFilter = (callback, props, context)=> {
  
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
## Added to Route Component
* Single Filter
```
<HashRouter >
  <Route path='/user' component={User}, enterFilter={ loginFilter } />
</HashRouter>
```
* Multiple Filters
```
<HashRouter >
  <Route path='/user' component={User}, enterFilter={[ loginFilter, permitFilter1, permitFilter2 ] } />
</HashRouter>
```
