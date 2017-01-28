import React, { Component } from 'react'
import { Boxer } from 'react-boxer'

export default class Ad extends Component {

  componentDidMount() {
    setTimeout(()=> {

      Boxer.remove(this)

    }, 3000)
  }

  render() {
    return (
      <li>
        <div><h5>{ this.props.title }</h5></div>
        <div style={{ color: '#999' }}>create time: { this.props.time.toLocaleString() }<br/>
        <b>Will be removed.</b></div>
      </li>
    )
  }
}
