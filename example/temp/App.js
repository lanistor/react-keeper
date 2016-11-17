import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, history, Link } from 'react-control'

const historyConfig = {
  type: 'hash',
  basename: ''
}

const About = React.createClass({
  render() {
    return ( <b>
      <p>About</p>
      <Route path="/a" index={'AboutA'} component={AboutA}/>
      <Route path="/b" component={AboutB} index={'AboutB'}/>
    </b>)
  }
})

class AboutB extends React.Component {
  render() {
    return <h3>AboutB</h3>
  }
}

const AboutA = ()=> {
  return <div><h3>AboutA</h3></div>
}

class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Router history={ history(historyConfig) }>
        <span>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li> <Link to="/about/a">AboutA</Link></li>
            <li> <Link to="/about/b">AboutB</Link></li>
            <li><Link to="/usera">Users</Link></li>
          </ul>

          <Route path="/" index={'Home'}>
            <p>Home</p>
          </Route>

          <Route path="/about" index={'About'} component={About}/>

          <Route path="/:userId" index={'User'}>
            <p>userId: </p>
          </Route>
          
        </span>

      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
