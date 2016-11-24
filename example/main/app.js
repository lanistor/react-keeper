import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, history } from 'react-control'

import Home from './pages/Home'

import Products from './pages/products/Products'
import Enterprise from './pages/products/Enterprise'
import Mobile from './pages/products/Mobile'
import Detail from './pages/products/Detail'

import AboutUs from './pages/AboutUs'

import Host from './pages/host/Host'

const historyConfig = {
  type: 'hash',
  basename: ''
}

class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <Router history={ history(historyConfig) }>
        
        <Route component={Home} path="/"/>

        <Route component={Products} path="/products">
          <Route rc-index component={Enterprise} path="/ep"/>
          <Route rc-miss component={Mobile}/>
          <Route component={Detail} path="/item/:id" time={new Date().toLocaleString()}/>
        </Route>

        <Route component={Host} path="/host" enterFilter={[ 'loginCheck', 'permitCheck' ]}/>

        <Route path="aboutus" component={AboutUs}/>

      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
