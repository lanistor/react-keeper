import React from 'react'
import './com.css'

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-static-top navbar-inverse bs-docs-nav" id="top" role="banner">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#/" className="navbar-brand">React-Control</a>
          </div>
          <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul className="nav navbar-nav">
              <li><a href="#/">Home</a></li>
              <li><a href="#/products">Products</a></li>
              <li><a href="#/aboutus">AboutUs</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#/host">User</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
