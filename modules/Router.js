import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import { clearMatch } from './RouteControl'
import { set as controlSet } from './OuterControl'
import Logger from './Logger'

let history = null
let unlisten = null

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)

    /** create history object */
    if(!history) {
      history = this.createHistory()
      controlSet('history', history)
    }

    // /** start history listener */
    this.unlisten = history.listen((location, action)=>{
      console.log('%c--history--', 'color;red', history)
      console.log('%c--window history--', 'color;red', window.history)
      controlSet('path', location.pathname)
      clearMatch()
      this.forceUpdate()
    })

    /** set history object to `Control Object` */
    controlSet('path', history.location.pathname)
  }

  /** react-hot-loader will unmount this component and */
  componentWillReceiveProps(nextProps) {
    clearMatch()
    this.forceUpdate()
  }

  componentWillUnmount() {
    this.unlisten()
  }


  /** get child context */
  getChildContext = ()=> {
    return {
      history: history,
      router: this
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
  router: React.PropTypes.any
}
