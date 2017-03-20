
const { HashRouter, Route, Link } = ReactKeeper

var Home = React.createClass({
  render(){
    return (
      <div>
        <h3>Page Home</h3>
      </div>
    )
  }
})

class Products extends React.Component {
  render() {
    return (
      <div>
        <h3>Page Products</h3>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

const User = (props)=> {
  return (
    <div>
      <h3>Page User</h3>
      <div>

      </div>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/user">User</Link></li>
        </ul>
        <HashRouter>
          <div>
            <Route path="/" component={ Home }/>
            <Route path="/products" component={ Products }/>
            <Route path="/user" component={ User }/>
          </div>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
