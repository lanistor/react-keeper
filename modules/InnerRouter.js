import React from 'react'
import PropTypes from 'prop-types'
import Logger from './utils/Logger'

export default class InnerRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.subscribers = []
  }

  /** get child context */
  getChildContext = ()=> {
    return {
      subscribe: this.subscribe
    }
  }

  subscribe = (callback)=> {
    if(this.subscribers.indexOf(callback) < 0) {
      this.subscribers.push(callback)
    }
    return ()=> {
      let index = this.subscribers.indexOf(callback)
      if( index >= 0 ) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.notify()
    }
  }

  notify = ()=> {
    for(let fn of this.subscribers) {
      fn()
    }
  }

  render() {
    if(!this.props.children || this.props.children.length===0) {
      return null
    }

    if(React.isValidElement(this.props.children)) {
      return React.Children.only(this.props.children)
    }
    Logger.error('The children of `*Router` component must be a single tag (not an array), like `div`|`view` .')
    return null
  }

}

InnerRouter.childContextTypes = {
  subscribe: PropTypes.func
}
