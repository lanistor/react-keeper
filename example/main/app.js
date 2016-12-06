import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-flex-router'

import Home from './pages/Home'

import Products from './pages/products/Products'
import Enterprise from './pages/products/Enterprise'
import Mobile from './pages/products/Mobile'
import Detail from './pages/products/Detail'

import AboutUs from './pages/AboutUs'

import Host from './pages/host/Host'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Home} path="/"/>

          <Route component={Products} path="/products">
            <Route index component={Enterprise} path="/ep"/>
            <Route miss component={Mobile}/>
            <Route component={Detail} path="/item/:id" time={new Date().toLocaleString()}/>
          </Route>

          <Route component={Host} path="/host" enterFilter={[ 'loginCheck', 'permitCheck' ]}/>

          <Route lock path="aboutus" component={AboutUs}/>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
