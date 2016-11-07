import React from 'react'
import history from './history'

export default class Link extends React.Component {

  constructor(...args) {
    super(...args)
  }

  render() {
    return <a>{this.props.children}</a>
  }
}

Link.propTypes = {
  children: React.PropTypes.any
}
