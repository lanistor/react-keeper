import React from 'react'
import history from './history'

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
    if(history.getHistory().location.pathname === to) {
      return
    }
    history.getHistory().push(to)
    history.getHistory().goForward()
  }

  render() {
    let { to:to, href:href, ...props } = this.props
    return <a onClick={this.handleClick} {...props}>{this.props.children}</a>
  }
}

Link.propTypes = {
  to: React.PropTypes.string,
  href: React.PropTypes.string,
  children: React.PropTypes.any.isRequired,
  onClick: React.PropTypes.any
}
