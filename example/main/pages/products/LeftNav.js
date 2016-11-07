import React from 'react'

export default class LeftNav extends React.Component {
  render() {
    return (
      <ul className="col-md-2">
        <li><a href="#/products/ep">Enterprise Website</a></li>
        <li><a href="#/products/mo">Mobile Website</a></li>
      </ul>
    )
  }
}
