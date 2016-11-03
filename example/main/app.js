import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, history } from 'react-control'


class Home extends React.Component {
  render() {
    return (<div>
      <p>Home</p>
      <p><a href="#/abouta">AboutA</a></p>
      <p><a href="#/aboutb">AboutB</a></p>
      <p><a href="#/user">User</a></p>
      <p><a href="#/list/123456">ListItem:123456</a></p>
      <p><a href="#/list/aaabbb">ListItem:aaabbb</a></p>
    </div>)
  }
}

class AboutA extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>AboutA</p>
      {this.props.children}
    </div>)
  }
}
AboutA.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element)
}

class AboutB extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>AboutB</p>
      {this.props.children}
    </div>)
  }
}
AboutB.propTypes = {
  children: React.PropTypes.any
}

class AboutC extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>AboutC</p>
      {this.props.children}
    </div>)
  }
}
AboutC.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element)
}

class User extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>User</p>
      <ul>
        <li><a href="#/user/info">UserInfo</a></li>
        <br/>
        <li><a href="#/user/info/face">UserInfoFace</a></li>
        <br/>
        <li><a href="#/userapis">UserApis</a></li>
      </ul>
      {this.props.children}
    </div>)
  }
}
User.propTypes = {
  children: React.PropTypes.any
}

class UserInfo extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>UserInfo</p>
      {this.props.children}
    </div>)
  }
}
UserInfo.propTypes = {
  children: React.PropTypes.any
}

class UserInfoFace extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>UserInfoFace</p>
    </div>)
  }
}

class UserApis extends React.Component {
  render() {
    return (<div>
      <p><a href="#/">&lt;Back</a></p>
      <p>UserApis</p>
      <ul>
        <li>API-1</li>
        <li>API-2</li>
        <li>API-3</li>
      </ul>
    </div>)
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <div>
      <p><a href="#/">&lt;Back</a></p>
        <p>ListItem</p>
        itemId:{this.props.itemId}
      </div>)
  }
}
ListItem.propTypes = {
  itemId: React.PropTypes.string
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
          <Route path="/aboutb" name="b" component={AboutB}/>
        </Route>

        <User path="/user" rcIndex>
          <UserInfo path="/info">
            <UserInfoFace path="face"/>
          </UserInfo>
        </User>
        <UserApis path="/userapis"/>

        <ListItem path="/list/:itemId" enterFilter={[ 'filterA', 'filterB' ]} name="FGHJKTY567HJ"/>

      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
