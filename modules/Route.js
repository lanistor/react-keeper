import React from 'react'

export default class Route extends React.Component {
  
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0
    }
  }

  render() {
    if(this.state.status === 0) {
      return null
    }
    return <div>{this.props.component}</div>
  }
}

Route.propTypes = {
  component: React.PropTypes.any
}
