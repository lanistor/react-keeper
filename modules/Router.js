import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import history from './history'
import routeControl from './routeControl'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,
      pages: [],
      components: []
    }

    /** get config by jsx & init history listener */
    let routeConfig = createRouteConfigByJSX(this.props.children)
    routeControl.init(this, this.props.history || history(), routeConfig)
  }

  /**
   * set pages to render
   */
  setPages(pages) {
    this.setState({ pages })
  }

  componentDidMount() {
    routeControl.triggerHistory()
  }

  getChildContext() {
    return {
      history: this.props.history
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.pages}
        {this.state.components}
      </div>
    )
  }
}

Router.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  className: React.PropTypes.string
}

Router.childContextTypes = {
  history: React.PropTypes.object
}
