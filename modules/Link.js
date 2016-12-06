import React from 'react'
import { go } from './OuterControl'

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
    
    if(this.context.history.location.pathname === to) {
      return
    }
    go(to)
  }

  render() {
    let { to, href, children, ...props } = this.props
    return <a onClick={this.handleClick} {...props}>{children}</a>
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  children: React.PropTypes.any.isRequired,
  onClick: React.PropTypes.any
}

Link.contextTypes = {
  history: React.PropTypes.any
}
