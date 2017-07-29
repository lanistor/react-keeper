import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, MemoryRouter, Route, Control } from 'react-keeper'
import { Box } from 'react-boxer'

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

class App extends React.Component {

  render() {

    return (
      <HashRouter>
        <div>
          <Route cache component={Home} path='/>'/>

          <Route component={Products} path='/products'>
            <Route cache='root' component={Enterprise} path='/ep'/>
            <Route miss index path='mo' component={Mobile}/>
            <Route cache='parent' component={Detail} path='/item/:id' time={new Date().toLocaleString()}/>
            <Route component={Ads} path='/ads' />
          </Route>

          <Route component={Host} path='/host' enterFilter={[ LoginFilter ]} leaveFilter={ UserLeave }/>

          <Route cache='root' path='aboutus' component={AboutUs}/>

          <Box index='5'/>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
