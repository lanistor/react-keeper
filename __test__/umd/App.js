
const { HashRouter, Route, Link, BrowserRouter, MemoryRouter } = ReactKeeper

class Home extends React.Componnet({
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
      <HashRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/user">User</Link></li>
          </ul>
          <div>
            <Route path="/" component={ Home }/>
            <Route path="/products" component={ Products }/>
            <Route path="/user" component={ User }/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
