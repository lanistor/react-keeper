import React from 'react'
import { createRouteConfigByJSX } from './RouteUtil'
import routeControl from './routeControl'
import history from './history'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0,
      pages: [],
      components: []
    }
  }

  setPages(pages) {
    this.setState({ pages })
  }

  componentWillMount() {

  }

  componentDidMount() {
    let history = this.props.history || history()
    let routeConfig = createRouteConfigByJSX(this.props.children)
    routeControl.init(this, history, routeConfig)
  }

  render() {
    console.log('---state---', this.state)
    // return React.createElement('div', { className : this.props.className}, ...this.state.pages, this.state.components)
    return (
      <div className={this.props.className}>
        {this.state.pages}
        {this.state.components}
      </div>
    )
  }
}

Router.propTypes = {
  history: React.PropTypes.object.isRequired,
  children: React.PropTypes.array
}
