# Control
### Use Router Control in JavaScript code.  
- `Control.path` : **readonly** The current path.  
- `Control.state` : **readonly** The current state (Also has effect in `HashRouter`).  
- `Control.go(pathOrIndex[, state])` : Go to a new path.  
  - pathOrIndex  
    * path : such as `/home`  
    * index : such as -1(history back), 1(history forward), -3(history back to the last third one)   
  - state  
    string or Object  

  ```
  Control.go('/home', { name: 'React-Keeper' })
  Control.go(-1);  Control.go(1);  Control.go(-3)
  ```
- `Control.replace(path, state)` (function) : Replace current path.

### Reminding
Use them in components [wrapped by Router Component](https://github.com/vifird/react-keeper/issues/100#event-2050157177), such as:  
```
<div>
  <HashRouter>
    <div>
      <Route path='/page1' component={ Page1 } key={'searchresult'} />
      <Nav/>
      { console.log("Don't use Control.path, Control.go here. ") }
    </div>
  </HashRouter>
</div>



class Nav extends React.Component {

  nextPage() {
    let path = Control.path;
    Control.go('/page1');
  }

  render() {
    ...
  }
}
```
