import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import history from './history'
import { clearMatch } from './RouteControl'
import { set as controlSet } from './OuterControl'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      components: [],
      history
    }
    
    controlSet('history', this.props.history)
    controlSet('path', this.props.history.location.pathname)

    this.props.history.listen((location, action)=>{
      controlSet('path', location.pathname)
      clearMatch()
      this.forceUpdate()
    })
  }

  getChildContext= ()=> {
    return {
      history: this.props.history,
      route: this
    }
  }

  render() {
    if(!this.props.children || this.props.children.length===0) {
      return null
    }
    if(this.props.children.length>1) {
      return <div>{ this.props.children }</div>
    }
    return React.Children.only(this.props.children)
  }
}

Router.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.any,
  className: React.PropTypes.string
}

Router.childContextTypes = {
  history: React.PropTypes.object,
  route: React.PropTypes.any
}
