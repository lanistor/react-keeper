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
About.propTypes = {
  children: React.PropoTypes.arrayOf(React.PropoTypes.element)
}

class AboutA extends React.Component {
  render() {
    return (<div>
      <p>AboutA</p>
      {this.props.children}
    </div>)
  }
}
AboutA.propTypes = {
  children: React.PropoTypes.arrayOf(React.PropoTypes.element)
}

class AboutB extends React.Component {
  render() {
    return (<div>
      <p>AboutB</p>
      {this.props.children}
    </div>)
  }
}
AboutB.propTypes = {
  children: React.PropoTypes.arrayOf(React.PropoTypes.element)
}

class AboutC extends React.Component {
  render() {
    return (<div>
      <p>AboutC</p>
      {this.props.children}
    </div>)
  }
}
AboutC.propTypes = {
  children: React.PropoTypes.arrayOf(React.PropoTypes.element)
}

class AboutD extends React.Component {
  render() {
    return (<div>
      <p>AboutD</p>
      {this.props.children}
    </div>)
  }
}
AboutD.propTypes = {
  children: React.PropoTypes.arrayOf(React.PropoTypes.element)
}

class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <Router history={history()}>
        
        <Home path="/"/>

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
