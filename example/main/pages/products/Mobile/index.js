import React from 'react'
import { Link, Route } from 'react-keeper'
import iPhone from './iPhone'
import Android from './Android'

export default class Mobile extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to='/products/mo/iphone' style={{ marginRight: '20px' }}>iPhone</Link>
          <Link to='/products/mo/android'>Android</Link>
        </div>
        <h3>Mobile</h3>
        <div>
          <Route path='/iphone' component={ iPhone }/>
          <Route index path='/android' component={ Android }/>
        </div>
      </div>
    )
  }
}
