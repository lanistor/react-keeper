import React, { Component } from 'react'
import { getIndex, getElements, addContainer, removeContainer } from './FlexElementManager'

export default class ElementContainer extends Component {

  constructor(...args) {
    super(...args)
    this.state = {
      index: getIndex(this.props.index),
      elements: []
    }
    addContainer(this, this.state.index)
  }

  componentDidMount() {
    this.updateElementsData()
  }

  componentWillUnmount() {
    removeContainer(this.state.index)
  }

  /** update elements */
  updateElementsData() {
    let elements = getElements(this.state.index)
    // if(elements === this.state.elements) {
    //   return
    // }
    this.setState({ elements })
  }

  render() {

    return React.createElement(this.props.type || 'div', null, this.state.elements)
  }
}
