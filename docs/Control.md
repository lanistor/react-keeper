# Control
Use Router Control in JavaScript code.  
`Control.path` (readonly) :  The current path.  
`Control.state` (readonly) : The current state (Has no effect in `HashRouter`).  
`Control.go(pathOrIndex, state)` (function) : Go to a new path.  
  - pathOrIndex  
    - path : such as `/home`  
    - index : such as -1(history back), 1(history forward), -3(history back to the last third one)   

`Control.replace(path, state)` (function) : Replace current path.
