import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import history from './history'
import { clearMatch } from './RouteControl'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,
      pages: [],
      components: [],
      history
    }


    this.props.history.listen((location, action)=>{
      clearMatch()
      this.forceUpdate()
    })

    /** get config by jsx & init history listener */
    // let routeConfig = createRouteConfigByJSX(this.props.children)
    // routeControl.init(this, this.props.history || history(), routeConfig)
  }

  /**
   * set pages to render
   */
  setPages(pages) {
    this.setState({ pages })
  }

  componentDidMount() {
    // routeControl.triggerHistory()
  }

  getChildContext= ()=> {
    return {
      history: this.props.history
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

Router.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.any,
  className: React.PropTypes.string
}

Router.childContextTypes = {
  history: React.PropTypes.object
}
