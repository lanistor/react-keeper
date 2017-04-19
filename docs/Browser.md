# Browser Leaded
If you use React-Keeper just in browser, you can lead it into html like this:  
```html
<script src="/umd/react-keeper.js"></script>
```

Then use as:  
```js
const { HashRouter, Route, Link, BrowserRouter, MemoryRouter } = ReactKeeper

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
```