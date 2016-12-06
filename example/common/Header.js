import React from 'react'
import { Link,Control } from 'react-flex-router'
import './com.css'

export default class Header extends React.Component {
  
  render() {

    return (
      <header className="navbar navbar-static-top navbar-inverse bs-docs-nav" id="top" role="banner">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="#/" className="navbar-brand">react-flex-router</Link>
          </div>
          <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul className="nav navbar-nav">
              <li className={ Control.path === '/'? 'active' : '' }>
                <Link to="/">Home</Link>
              </li>
              <li className={ Control.path.indexOf('/products') === 0? 'active' : '' }>
                <Link to="/products">Products</Link>
              </li>
              <li className={ Control.path.indexOf('/aboutus') === 0? 'active' : '' }>
                <Link to="/aboutus">AboutUs</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className={ Control.path.indexOf('/host') === 0? 'active' : '' }>
                <Link to="/host">User</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
