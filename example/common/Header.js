import React, { Component } from 'react'
import { Link, CacheLink, Control } from 'react-keeper'
import { Boxer } from 'react-boxer'
import Actor from 'react-actor'
import Login from './Login'
import './com.css'

let style = {
  hrefState: {
    width: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: '#fff',
    paddingLeft: 0
  }
}

export default class Header extends Actor {

  constructor(...args) {
    super(...args)
  }

  reLogin() {
    Boxer.add(<Login title='ReLogin'/>, 5)
  }

  /** supported by 'react-actor' */
  clearAboutUsCache() {
    this.act('clearAboutUsCache', { clearData: 1 })
  }

  render() {

    return (
      <header className='navbar navbar-static-top navbar-inverse bs-docs-nav' id='top' role='banner'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='#/' state={{ id: 'home', time: new Date().toLocaleString() }} className='navbar-brand'>react-keeper</Link>
          </div>
          <nav className='collapse navbar-collapse bs-navbar-collapse' role='navigation'>
            <ul className='nav navbar-nav'>
              <li className={ Control.path === '/'? 'active' : '' }>
                <Link to='/' state={{ id: 'home', time: new Date().toLocaleString() }}>Home</Link>
              </li>
              <li className={ Control.path.indexOf('/products') === 0? 'active' : '' }>
                <CacheLink to='/products' state={{ id: 'products', time: new Date().toLocaleString() }}>Products</CacheLink>
              </li>
              <li className={ Control.path.indexOf('/aboutus') === 0? 'active' : '' }>
                <Link to='/aboutus' state={{ id: 'aboutus', time: new Date().toLocaleString() }}>AboutUs</Link>
              </li>

              <li><a></a></li>
              <li><a></a></li>
              <li><a onClick={ ()=> Control.go(-1) }>Back -1</a></li>
              <li><a onClick={ ()=> Control.go(-3) }>Back -3</a></li>
              <li><a onClick={ ()=> Control.go(1) }>Forward</a></li>
              <li><Link to='/aaaa'>Miss</Link></li>

              <li><a onClick={ ()=> this.clearAboutUsCache() }>Clear AboutUs cache</a></li>

              <li><a style={ style.hrefState } title={ `${Control.path} - ${JSON.stringify(Control.state)}`}>{ Control.path } - { JSON.stringify(Control.state) }</a></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>
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
