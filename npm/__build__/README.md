# React-Flex-Router

**More than router.**

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

* Supports muiltiple pages.
  1. Use `lock` tag to lock a page.
  2. Use `muiltiple` tag for muiltiple matching.
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
        <Route index component{ ProductNav }/>
      </Route>

    </div>
  </HashRouter>
  ```
* Supports rendering in server side.
  