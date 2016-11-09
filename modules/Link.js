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

  handleClick= (to)=> {
    history.getHistory().push(to)
    history.getHistory().goForward()
  }

  render() {
    let { to, href, ...props } = this.props
    if(!to){
      to = href
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
    let toDo = { onClick: ()=>this.handleClick(to) }
    return <a {...toDo} {...props}>{this.props.children}</a>
  }
}

Link.propTypes = {
  to: React.PropTypes.string,
  href: React.PropTypes.string,
  children: React.PropTypes.any.isRequired
}
