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
  }

  /**
   * set pages to render
   */
  setPages(pages) {
    this.setState({ pages })
  }

  componentDidMount() {

    /** init history listener & get config by jsx */
    let routeConfig = createRouteConfigByJSX(this.props.children)
    routeControl.init(this, this.props.history || history(), routeConfig)
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
