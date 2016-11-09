import React from 'react'
import { Link } from 'react-control'

export default class LeftNav extends React.Component {
  render() {
    return (
      <ul className="col-md-2">
        <li><Link href="#/products/ep">Enterprise Website</Link></li>
        <li><Link href="#/products/mo">Mobile Website</Link></li>
      </ul>
    )
  }
}
