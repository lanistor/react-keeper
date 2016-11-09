import React from 'react'
import { Link } from 'react-control'

export default class LeftNav extends React.Component {
  render() {
    return (
      <ul className="col-md-2">
        <li><Link href="#/host/info">Information</Link></li>
        <li><Link href="#/host/edit">Edit</Link></li>
        <li><Link href="#/host/concerns">Concerns</Link></li>
      </ul>
    )
  }
}
