import React from 'react'
import { Link, Control, Flex } from 'react-flex-router'
import Login from './Login'
import './com.css'

export default class Header extends React.Component {
  
  reLogin() {
    Flex.add(<Login title='ReLogin'/>, 5)
  }

  render() {

    return (
      <header className='navbar navbar-static-top navbar-inverse bs-docs-nav' id='top' role='banner'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='#/' className='navbar-brand'>Feact-Flex-Router</Link>
          </div>
          <nav className='collapse navbar-collapse bs-navbar-collapse' role='navigation'>
            <ul className='nav navbar-nav'>
              <li className={ Control.path === '/'? 'active' : '' }>
                <Link to='/'>Home</Link>
              </li>
              <li className={ Control.path.indexOf('/products') === 0? 'active' : '' }>
                <Link to='/products'>Products</Link>
              </li>
              <li className={ Control.path.indexOf('/aboutus') === 0? 'active' : '' }>
                <Link to='/aboutus'>AboutUs</Link>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li className={ Control.path.indexOf('/host') === 0? 'active' : '' }>
                <a href='javascript:void(0)' onClick={ this.reLogin }>Relogin</a>
              </li>
              <li className={ Control.path.indexOf('/host') === 0? 'active' : '' }>
                <Link to='/host'>User</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
