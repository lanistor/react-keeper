# React-Keeper
  A routing library of React, but more than router.  
  React-Router is a great product, we learned a lot from it. But we truely faced many problems that React-Router doesn't resolve in real using, especially in mobile APPs.  
  We did a lot to let React-Keeper fit mobile APPs, such as `Pages Cache`, `Scroll Memory`.   
  We create a lot of flexible ways, so you can config the router more simplely.   
  And more...  

## Install
  ```
  npm install react-keeper
  ```

## Features

### 1. Extensible route

  You can add route components ***anywhere,anytime***.
  ```javascript
  const App = ()=> {
    return (
      <HashRouter>
        <div>
          <Route cache component={ Home } path="/"/>
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

### 2. Pages Cache
  Cache pages' state while not matched, and recover them when matched. Certainly you can config which one to cache.  
  1. Use `cache` tag to cache a page.
  3. Use `CacheLink` Component to hold a will-unmount's page when open a new page.  

  ```javascript
   <Route cache component={Home} path='/'/>

   <CacheLink to='/product/ASDFADF'>Detail</CacheLink>
  ```

### 3. Supports loading components dynamicly

  Load a component dynamicly when it's route matches, such as:  

  ```javascript
  <Route loadComponent={ (callback)=>{
      System.import('../Products.js').then((Products)=>{
          callback(Products)
        })
    } } path='/products'/>
  ```

### 4. Supports enter(and leave) filters
  * `Enter filters`, filters run before a route mount succeed, such as : login's check.
  * `Leave filters`, filters run before a route unmount succeed, such as : unsubmited form data.

  ```javascript
  <HashRouter>
    <Route path='/user' component={User}, enterFilter={[ loginFilter, (cb, props)=>{ if(props.access) cb()} ] } />
  </HashRouter>
  ```

### 5. Pretty flexible
  * `index` tag : Index page of a module.
  * `miss` tag : When miss match.
  * `cache` tag : Cache a page for preventing to unmount after it mounted.  
  ```javascript
  <HashRouter>
    <div>

      <Route cache component={ Home } path="/"/>

      <Route component={ Products } path="/products" enterFilter={ loginFilter }>
        <Route index component={Enterprise} path="/ep"/>
        <Route miss component={ NotFound }/>
        <Route component={ Detail } path="/item/:id" time={new Date().toLocaleString()}/>
      </Route>

      <Route component={ Home }  path="/products">
        <Route index component={ ProductNav }/>
      </Route>

    </div>
  </HashRouter>
  ```

### 6. In the future
  * Supports rendering in server side

  * Memory of scroll position  
    Remember the scroll positions of every page, for scrolling to same position when back to a page.

## Usage
  App.js
  ```javascript
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import { HashRouter, Route } from 'react-keeper'
  import User from './User'
  // other import

  class App extends Component {
    render(){
      return (
        <HashRouter>
          <div>

            <Route cache component={ Home } path="/"/>

            <Route component={ Products } path="/products" enterFilter={ loginFilter }>
              <Route index component={Enterprise} path="/ep"/>
              <Route miss component={ NotFound }/>
              <Route component={ Detail } path="/item/:id" time={new Date().toLocaleString()}/>
            </Route>

            <Route component={ User }  path="/user"/>

          </div>
        </HashRouter>
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById('root'))  
  ```
  User.js
  ```javascript
  import React, { Component } from 'react'
  import { Link, Route } from 'react-keeper'
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

## Contributors
  * ***Clone Project***
  ```
  git clone git@github.com:vifird/react-keeper.git

  cd react-keeper

  npm install
  ```

  * ***Run Example***
  ```
  npm run example
  ```
  Then open `http://127.0.0.1:8600`
