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
  constructor(...args) {
    super(...args)
    this.checkA = function() {
      alert(2)
    }
  }
  check() {
    alert(1)
  }
  render() {
    return (<div>
      <p>About</p>
      {this.props.children}
    </div>)
  }
}
class AboutA extends React.Component {
  render() {
    return (<div>
      <p>AboutA</p>
      {this.props.children}
    </div>)
  }
}
class AboutB extends React.Component {
  render() {
    return (<div>
      <p>AboutB</p>
      {this.props.children}
    </div>)
  }
}
class AboutC extends React.Component {
  render() {
    return (<div>
      <p>AboutC</p>
      {this.props.children}
    </div>)
  }
}
class AboutD extends React.Component {
  render() {
    return (<div>
      <p>AboutD</p>
      {this.props.children}
    </div>)
  }
}


class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  getName() {
    return "App"
  }

  componentDidMount() {
    // console.log('--refs--', this.refs)
  }

  render() {
    // return (
    //   <Router history={history()}>
    //     <Home/>
    //     <Route enterFilter={[ 'filterA', 'filterB' ]} leaveFilter={[ ]}>
    //       <Route path="/abouta" component={About}/>
    //       <Route path="/aboutb" component={AboutB}/>
    //     </Route>
    //     <Route path="/about" component={About}>
    //       <Route path="/a" component={AboutA}>
    //         <Route path="/c" component={AboutA}/>
    //       </Route>
    //       <Route path="/b" component={AboutB}/>
    //     </Route>
    //   </Router>
    // )
    return (
      <Router history={history()}>
        <Home/>

        <Route enterFilter={[ 'filterA', 'filterB' ]} leaveFilter={[ 'filterA' ]}>
          <AboutA path="/abouta" name="a"/>
          <AboutB path="/aboutb" name="b"/>
          <Route path="/aboutc" name="c" component={'asynB'}/>
        </Route>

        <About path="/about" rcIndex>
          <AboutA path="/a" rcIndex/>
          <AboutB path="/b">
            <AboutC path="/:cName"/>
          </AboutB>
          <AboutD path="/d"/>
        </About>
        <AboutD path="/list/:item" enterFilter={[ 'filterA', 'filterB' ]} name="ccc"/>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
