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
Use them in [children components of Router component](https://github.com/vifird/react-keeper/issues/100#event-2050157177), or after Router component.  
**Right case:**  
```jsx
<div>
  <HashRouter>
    <div>
      <Com1/>
    </div>
  </HashRouter>
  <Com2/>
</div>
```
You can use them in `Com1` and `Com2`:  
```js
class Com1 extends React.Component {

  nextPage() {
    let path = Control.path;
    Control.go('/page1');
  }

  render() {
    ...
  }
}
```  

And, don't use them in code embed in Router component, or components before Router.  
**Error cases:**  
```jsx
<div>
  <Com1/>
  <Com2><div>{ console.log(Control.path) }</div></Com2>
  <HashRouter>
    <div>
      <Com3>
        <div>{ console.log(Control.path) }</div>
      </Com3>
    </div>
  </HashRouter>
</div>
```
Don't use them in Com1, and the `console.log` will print `undefined`;
