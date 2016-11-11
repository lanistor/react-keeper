import React from 'react'
import { Link, Control } from 'react-control'

export default class LeftNav extends React.Component {

  render() {

    return (
      <div className="col-md-2">
        <ul className="nav nav-pills nav-stacked">
          <li className={ Control.path === '/products/ep'? 'active' : '' }>
            <Link href="/products/ep">Enterprise Website</Link>
          </li>
          <li className={ Control.path === '/products/mo'? 'active' : '' }>
            <Link href="/products/mo">Mobile Website</Link>
          </li>
        </ul>
      </div>
    )
  }
}

LeftNav.propTypes = {
  item: React.PropTypes.any
}
