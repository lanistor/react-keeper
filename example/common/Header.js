import React from 'react'
import { Link } from 'react-control'
import './com.css'

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-static-top navbar-inverse bs-docs-nav" id="top" role="banner">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="#/" className="navbar-brand">React-Control</Link>
          </div>
          <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/aboutus">AboutUs</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/host">User</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
