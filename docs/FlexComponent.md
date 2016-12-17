# Flex Component
  React-Flex-Router supports a way to add(and remove) components flexiblely, this is good use for flexible projects.  
  You will use this if your job has `float login panel`, `changed ads`, `popup dialogs` and so on. 

  ---
  <font color='#f70'>Let's show a float login panel use case. </font>   
  Float login panel will appear *anywhere,anytime* for an unlogin user, so it's hard to decide where to put it, and when to mount it. 

## Example : Float Login Panel
  Now we show how to use `Flex Component` resolve this problem.
  1. First, we define a `Login Component`, with remove function.  
  `Login.js`
  ```javascript
  import React, { Component } from 'react'
  import { Flex } from 'react-flex-router'

  export default class Login extends Component {

    // remove login panel
    remove = ()=> {
      Flex.remove(this)
    }

    render() {
      return (
        <div>
          <h5>Login</h5>
          <form>
            <div><input type='text' placeHolder={ this.props.defaultName ||'Username'} /></div>
            <div><input type='password' placeHolder='Password'/></div>
          </form>
          <div>

            <button onClick={ remove }>Cancel</button>

            <button>Login</button>
          </div>
        </div>
      )
    }
  }
  ```

  2. Second, we add a container to React (use `FlexContainer`)  
  `App.js`
  ```javascript
  import React, { Component } from 'react'
  import { HashRouter, Route, FlexContainer } from 'react-flex-router'
  import User from './User'
  // other import

  class App extends Component {

    render() {
      return (
        <HashRouter>
          <div className='page-group'>
            <Route index path='/' component={ Home } />
            <Route path='/user' component={ User } />

            <FlexContainer index='1'/>

          </div>
        </HashRouter>
      )
    }
  }
  ```

  3. Now, you can add Login Component anywhere, anytime.  
  `User.js` 
  ```javascript
  import React, { Component } from 'react'
  import { Flex } from 'react-flex-router'
  import Login from './Login'

  export default class User extends Component {

    // add login panel
    login = ()=> {
      Flex.add(<Login defaultName={ 'John' } />, 1)
    }

    render() {
      return (
        <div>
          <button onClick={ this.login }>Login</button>
        </div>
      )
    }
  }
  ```
