import React from 'react'
import InnerRouter from './InnerRouter'
import HistoryControl, {
  listener as historyControlListener,
  setHistory as historyControlSet
} from './HistoryControl'
import CacheOfLinkControl from './CacheOfLinkControl'
import RouteMatchGroupControl from './RouteMatchGroupControl'
import Logger from './Logger'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)

    historyControlSet(this.props.history)
    historyControlListener(this.props.history.location, this.props.history.action)

    // /** start history listener */
    this.unlisten = this.props.history.listen((location, action)=>{
      RouteMatchGroupControl.historyChanged()
      historyControlListener(location, action)
      CacheOfLinkControl.onHistoryChanged(location)
      this.forceUpdate()
    })
  }

  static childContextTypes = {
    history: React.PropTypes.any
  }

  getChildContext() {
    return {
      history: this.props.history
    }
  }

  /** react-hot-loader will unmount this component and */
  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    let { ...props } = this.props
    return (
      <InnerRouter
        location={ this.props.history.location }
        action={ this.props.history.action }
        { ...props } />
    )
  }
}
