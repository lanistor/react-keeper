import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, history } from 'react-control'

import Home from './pages/Home'

import Products from './pages/products/Products'
import Enterprise from './pages/products/Enterprise'
import Mobile from './pages/products/Mobile'
import AboutUs from './pages/AboutUs'

import Host from './pages/host/Host'
import HostInfo from './pages/host/HostInfo'
import Concerns from './pages/host/Concerns'
import Edit from './pages/host/Edit'

class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <Router history={history()}>
        
        <Home path="/"/>

        <Products path="/products">
          <Enterprise path="/ep"/>
          <Mobile path="/mo"/>
        </Products>

        <Host path="/host" enterFilter={[ 'loginCheck', 'permitCheck' ]}>
          <HostInfo path="/info" rcIndex/>
          <Edit path="edit" leaveFilter={[ 'editLeave' ]}/>
          <Route path="concerns" component={Concerns}/>
        </Host>

        <Route path="aboutus" component={AboutUs}/>

      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
