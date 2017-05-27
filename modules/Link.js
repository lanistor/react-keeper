import React from 'react'
import HistoryControl from './HistoryControl'

/**
 * replace the tag 'A', used to link to a new url
 * @module Link
 */
export default class Link extends React.Component {

  constructor(...args) {
    super(...args)
  }

  handleClick= ()=> {

    if(this.props.onClick && (typeof this.props.onClick === 'function')) {
      this.props.onClick()
    }

    let { to, href, state } = this.props
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

    if(this.context.history.getCurrentLocation().pathname === to) {
      return
    }

    this.go(to, state)
  }

  render() {
    let { to, href, state, children, isActive, activeStyle, activeClassName, style, className, type, ...props } = this.props
    if(!type) {
      type = 'a'
    }

    if(type==='a') {
      props['href'] = 'javascript:void(0)'
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

Link.prototype.go = function(to, state) {
  HistoryControl.go(to, state)
}

if(__DEV__) {

  Link.propTypes = {
    state: React.PropTypes.any,
    to: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    children: React.PropTypes.any,
    onClick: React.PropTypes.any
  }
}

Link.contextTypes = {
  history: React.PropTypes.any,
  routes: React.PropTypes.array
}
