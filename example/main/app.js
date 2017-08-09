import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, MemoryRouter, Route, Control } from 'react-keeper'
import { Box } from 'react-boxer'
import Actor from 'react-actor'

import Home from './pages/Home'

import Products from './pages/products/Products'
import Enterprise from './pages/products/Enterprise'
import Mobile from './pages/products/Mobile/index'
import Detail from './pages/products/Detail'
import Ads from './pages/products/Ads'

import AboutUs from './pages/AboutUs'

import Host from './pages/host/Host'

import LoginFilter from './filter/LoginFilter'
import UserLeave from './filter/UserLeave'

class App extends Actor {

  constructor(...args) {
    super(...args)
    this.state = {
      cacheAboutUs: 'root'
    }

    /** supported by 'react-actor', action triggered in '../common/Header.js' */
    this.onAction('clearAboutUsCache', ()=>{
      alert(`${this.state.cacheAboutUs? 'clear' : 'reset'}AboutUsCache`)
      this.setState({ cacheAboutUs: this.state.cacheAboutUs? false : 'root' })
    })
  }

  render() {

    return (
      <HashRouter>
        <div>
          <Route miss cache component={Home} path='/>'/>

          <Route component={Products} path='/products'>
            <Route component={Enterprise} path='/ep'/>
            <Route index miss path='mo' component={Mobile}/>
            <Route cache='parent' component={Detail} path='/item/:id' time={ 7 }/>
            <Route component={Ads} path='/ads' />
          </Route>

          <Route component={Host} path='/host' enterFilter={[ LoginFilter ]} leaveFilter={ UserLeave }/>

          <Route cache={ this.state.cacheAboutUs } path='aboutus' component={AboutUs}/>

          <Box index='5'/>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
