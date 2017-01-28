import React from 'react'
import HistoryControl from './HistoryControl'

/**
 * replace the tag 'A', used to link to a new url
 * @module Link
 */
export default class Link extends React.Component {

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    children: React.PropTypes.any,
    onClick: React.PropTypes.any
  }

  static contextTypes = {
    history: React.PropTypes.any,
    routes: React.PropTypes.array
  }

  constructor(...args) {
    super(...args)
  }

  handleClick= ()=> {

    if(this.props.onClick && (typeof this.props.onClick === 'function')) {
      this.props.onClick()
    }

    let { to, href } = this.props
    if(!to) {
      to = href
    }
    if(typeof to === 'undefined' || to === null) {
      return
    }
    if(!to) {
      to = '/'
    }
    if(to.indexOf('#') === 0) {
      to = to.substring(1)
    }
    if(to.indexOf('/') !== 0) {
      to = `/${to}`
    }

    if(this.context.history.location.pathname === to) {
      return
    }

    this.go(to)
  }

  render() {
    let { to, href, children, isActive, activeStyle, activeClassName, style, className, type, ...props } = this.props
    if(!type) {
      type = 'a'
    }

    if(isActive) {
      if(typeof isActive === 'function') {
        isActive = isActive()
      }else {
        isActive = !!isActive
      }
    }else {
      isActive = (HistoryControl.path === to)
    }

    if(isActive) {
      if(activeStyle)
        style = Object.assign({}, style, activeStyle)
      if(activeClassName)
        className = className? (className + ' ' + activeClassName) : activeClassName
    }

    return React.createElement(type, { onClick : this.handleClick, style, className, ...props }, children)
  }
}

Link.prototype.go = function(to) {
  HistoryControl.go(to)
}
