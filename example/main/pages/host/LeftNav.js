import React from 'react'
import { Link, Control } from 'react-keeper'

export default class LeftNav extends React.Component {
  render() {
    return (
      <div className='col-md-2'>
        <ul className='nav nav-pills nav-stacked'>
          <li className={ Control.path === '/host/info' || Control.path === '/host'? 'active' : '' }>
            <Link to='/host/info'>Information</Link>
          </li>
          <li className={ Control.path === '/host/edit'? 'active' : '' }>
            <Link to='#/host/edit'>Edit</Link>
          </li>
          <li className={ Control.path === '/host/concerns'? 'active' : '' }>
            <Link to='#/host/concerns'>Concerns</Link>
          </li>
        </ul>
      </div>
    )
  }
}
