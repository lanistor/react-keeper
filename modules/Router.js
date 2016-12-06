import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import { clearMatch } from './RouteControl'
import { set as controlSet } from './OuterControl'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)

    /** create history object */
    this.state = {
      history: this.createHistory()
    }

    
    /** set history object to `Control Object` */
    controlSet('history', this.state.history)
    controlSet('path', this.state.history.location.pathname)

    // /** start history listener */
    this.state.history.listen((location, action)=>{
      controlSet('path', location.pathname)
      clearMatch()
      this.forceUpdate()
    })
  }

  /** get child context */
  getChildContext = ()=> {
    return {
      history: this.state.history,
      route: this
    }
  }

  render() {
    if(!this.props.children || this.props.children.length===0) {
      return null
    }

    if(React.isValidElement(this.props.children)) {
      return React.Children.only(this.props.children)
    }
    console.error('The children of `*Router` component must be a single tag (not an array), like `div`|`view` .')
    return null
  }
}

/**
 * create history object
 * override by child class
 */
Router.prototype.createHistory = function () {
  return null
}

Router.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string
}

Router.childContextTypes = {
  history: React.PropTypes.object,
  route: React.PropTypes.any
}
