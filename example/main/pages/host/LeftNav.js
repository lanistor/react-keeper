import React from 'react'
import { Link, Control } from 'react-control'

export default class LeftNav extends React.Component {
  render() {
    return (
      <div className="col-md-2">
        <ul className="nav nav-pills nav-stacked">
          <li className={ Control.path === '/host/info'? 'active' : '' }>
            <Link href="/host/info">Information</Link>
          </li>
          <li className={ Control.path === '/host/edit'? 'active' : '' }>
            <Link href="#/host/edit">Edit</Link>
          </li>
          <li className={ Control.path === '/host/concerns' || Control.path === '/host'? 'active' : '' }>
            <Link href="#/host/concerns">Concerns</Link>
          </li>
        </ul>
      </div>
    )
  }
}
