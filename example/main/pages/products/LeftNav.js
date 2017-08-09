import React from 'react'
import PropTypes from 'prop-types'
import { Link, CacheLink, Control } from 'react-keeper'

export default class LeftNav extends React.Component {

  render() {
    return (
      <div className='col-md-2'>
        <ul className='nav nav-pills nav-stacked'>
          <li className={ Control.path === '/products/ep'? 'active' : '' }>
            <CacheLink to='/products/ep'>Enterprise Website</CacheLink>
          </li>
          <li className={ Control.path === '/products/mo' || Control.path === '/products'? 'active' : '' }>
            <CacheLink to='/products/mo'>Mobile Website</CacheLink>
          </li>
          <li className={ Control.path === '/products/item/first'? 'active' : '' }>
            <CacheLink to='/products/item/first'>Detail First</CacheLink>
          </li>
          <li className={ Control.path === '/products/item/second'? 'active' : '' }>
            <CacheLink to='/products/item/second'>Detail Second</CacheLink>
          </li>
          <li className={ Control.path === '/products/ads'? 'active' : '' }>
            <CacheLink to='/products/ads'>Dynamic Ads</CacheLink>
          </li>
          <li className={ Control.path === '/products/aaa'? 'active' : '' }>
            <Link to='/products/aaa'>Miss Check</Link>
          </li>
        </ul>
      </div>
    )
  }
}

LeftNav.propTypes = {
  item: PropTypes.any
}
