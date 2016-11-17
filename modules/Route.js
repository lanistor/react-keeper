import React from 'react'
import matchPath from './match/matchPath'
import { shouldMatch, addMatch, removeMatch, test } from './RouteControl'

export default class Route extends React.Component {
  
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0  //0: unbind, 1: bind
    }
  }

  componentWillMount = ()=> {
    this.checkMatch(this.props)
  }

  componentDidMount = ()=> {
    if(this.state.status === 1) {
      addMatch(this)
    }
  }

  componentWillReceiveProps = (nextProps)=> {
    console.log('componentWillReceiveProps', nextProps.index)
    this.checkMatch(nextProps)
  }

  componentWillUnmount = ()=> {
    removeMatch(this)
  }
  
  checkMatch = (nextProps)=> {
    let status = 0
    const { path: pattern, multiple } = nextProps
    const { pathname } = this.context.history? this.context.history.location : { }

    if(typeof pathname === 'undefined') {
      this.setState({ status: 0 })
      return
    }
    if(typeof pattern === 'undefined') {
      this.setState({ status: 1 })
      return
    }

    let matcher = matchPath(pathname, pattern)
    if(matcher.match) {
      if(multiple || shouldMatch(this, true)) {
        status = 1
      }else{
        status = 0
      }
    }else {
      status = 0
    }
    this.setState({ status })
  }
  

  render = ()=> {

    const { component, path, multiple, remain, children, ...props } = this.props
    const { pathname } = this.context.history? this.context.history.location : { }

    if(this.state.status === 0) {
      return null
    }

    if(component) {
      return React.createElement(component, { pathname, ...props }, children)
    }

    return React.Children.only(children)
  }

}

Route.propTypes = {
  component: React.PropTypes.any,
  enterFilter: React.PropTypes.array,
  leaveFilter: React.PropTypes.array,
  path: React.PropTypes.string,
  multiple: React.PropTypes.string,
  remain: React.PropTypes.string
}

Route.contextTypes = {
  history: React.PropTypes.object.isRequired
}
