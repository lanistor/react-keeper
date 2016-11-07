import React from 'react'

export default class LeftNav extends React.Component {
  render() {
    return (
      <ul className="col-md-2">
        <li><a href="#/host/info">Information</a></li>
        <li><a href="#/host/edit">Edit</a></li>
        <li><a href="#/host/concerns">Concerns</a></li>
      </ul>
    )
  }
}
