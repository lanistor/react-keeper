import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, history } from 'react-control'


class Home extends React.Component {
  render() {
    return (<div>
      <p><a href="#/home">Home</a></p>
      <p><a href="#/about">About</a></p>
      <p><a href="#/about/a">AboutA</a></p>
      <p><a href="#/about/b">AboutB</a></p>
    </div>)
  }
}

class About extends React.Component {
  render() {
    return (<div>About</div>)
  }
}
class AboutA extends React.Component {
  render() {
    return (<div>AboutA</div>)
  }
}
class AboutB extends React.Component {
  render() {
    return (<div>AboutB</div>)
  }
}


class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <Router history={history()}>
        <Home/>
        <Route enterFilter={[ 'filterA', 'filterB' ]} leaveFilter={[ ]}>
          <Route path="/abouta" component={About}/>
          <Route path="/aboutb" component={AboutB}/>
        </Route>
        <Route path="/about" component={About}>
          <Route path="/a" component={AboutA}>
            <Route path="/c" component={AboutA}/>
          </Route>
          <Route path="/b" component={AboutB}/>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
