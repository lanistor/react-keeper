# React-Flex-Router
  A routing library of React, but more than router.  
  React-Router is a great product, we learned a lot from it. But we truely faced many problems that React-Router doesn't resolve in real using, especially in mobile APPs.  
  We did a lot to let React-Flex-Router fit mobile APPs, such as `Pages Cache`, `Scroll Memory`.  
  We add samll component support, to let you project fit more flexible WEB or mobile APPs.  
  We create a lot of flexible ways, so you can config the router more simplely.   
  And more...
## Docs
  [Route Component](docs/Route.md)  
  [Link Component](docs/Link.md)

## Features

* Extensible route.

  You can add route components ***anywhere,anytime***.
  ```
  const App = ()=> {
    return (
      <HashRouter>
        <div>
          <Route lock component={ Home } path="/"/>
          <Route component={ Products } path="/products"/>
        </div>
      </HashRouter>
    )
  }

  const Products = ()=> {
    return (
      <div>
        <Route component={ ScienceProducts } path="/sci" />
        <Route component={ DailiUseProducts } path="/dai" />
      </div>
    )
  }

  ReactDOM.render(<App/>, document.getElementById('root'))
  ```

* Pages Cache
  1. Use `lock` tag to lock a page.
  3. Use `page hook` to hold a will-unmount's page when open a new page.

* Memory of scroll position.

  Remember the scroll positions of every page, for scrolling to same position when back to a page.

* Add samll components' frame.

  Flexible web projects will need a lot of small components(Such as: float login panel, changeable advert, and so on), which will be added to document ***anywhere,anytime***, it's high-cost before `React-Flex-Router` came.

* Supports loading components dynamicly.

  Load a component dynamicly when it's route matches.

* Supports enter(or leave) filters before a page will mount(or unmount).
  * `Enter filters`, such as : login's check.
  * `Leave filters`, such as : unsubmited form data.

* Pretty flexible. 
  * `index` tag : Index page of a module.
  * `miss` tag : When miss match.
  * `lock` tag : Lock a page for preventing to unmount after it mounted.
  * `muiltiple` tag : For muiltiple matching's need.
  ```
  <HashRouter>
    <div>

      <Route lock component={ Home } path="/"/>

      <Route component={ Products } path="/products" enterFilter={ loginFilter }>
        <Route index component={Enterprise} path="/ep"/>
        <Route miss component={ NotFound }/>
        <Route component={ Detail } path="/item/:id" time={new Date().toLocaleString()}/>
      </Route>

      <Route muiltiple component={ Home }  path="/products">
        <Route index component={ ProductNav }/>
      </Route>

    </div>
  </HashRouter>
  ```
* Supports rendering in server side.

## Install
  ```
  npm install react-flex-router --save-dep
  ```

## Usage
  App.js
  ```
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import { HashRouter, Route } from 'react-flex-router'
  // other import

  class App extends Component {
    render(){
      return (
        <HashRouter>
          <div>

            <Route lock component={ Home } path="/"/>

            <Route component={ Products } path="/products" enterFilter={ loginFilter }>
              <Route index component={Enterprise} path="/ep"/>
              <Route miss component={ NotFound }/>
              <Route component={ Detail } path="/item/:id" time={new Date().toLocaleString()}/>
            </Route>

            <Route muiltiple component={ User }  path="/user"/>

          </div>
        </HashRouter>
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById('root'))  
  ```
  User.js
  ```
  import React, { Component } from 'react'
  import { Link, Route } from 'react-flex-router' 
  // other import

  export default class User extends Component {
    render(){
      return (
        <div>
          <ul>
            <Link to='/info'>Info</Link>
            <Link to='/edit'>Edit</Link>
          </ul>

          <div>
            <Route index component={ UserInfo } path='/info'/>
            <Route component={ UserInfoEdit } path='/edit'/>
          </div>
        </div>
      )
    }
  }
  ```