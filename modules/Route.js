import React from 'react'

export default class Route extends React.Component {
  
  constructor(...args) {
    super(...args)
  }

}

Route.propTypes = {
  component: React.PropTypes.any,
  enterFilter: React.PropTypes.array,
  leaveFilter: React.PropTypes.array,
  path: React.PropTypes.array
}
