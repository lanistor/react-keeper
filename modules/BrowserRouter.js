import React from 'react'
import Router from './Router'
import createBrowserHistory from 'history/createBrowserHistory'
import { objectWithoutProperties, resetPath } from './Util'

export default class BrowserRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
    this.history.type = 'browser'
  }

  createHistory = ()=> {
    let { basename, hashType, getUserConfirmation }  = this.props
    if(!/^(\.|\/)/.test(basename))
      basename = resetPath(basename)
    return createBrowserHistory({ basename, hashType, getUserConfirmation })
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'basename', 'hashType', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
