import React from 'react'
import Router from './Router'
import createBrowserHistory from 'vhistory/createBrowserHistory'
import useBasename from 'vhistory/useBasename'
import { objectWithoutProperties, resetPath } from './utils/Util'

export default class BrowserRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
    this.history.type = 'browser'
  }

  createHistory = ()=> {
    let { basename, hashType, getUserConfirmation }  = this.props
    if(basename && !/^(\.|\/)/.test(basename))
      basename = resetPath(basename)
    let history
    if(basename) {
      history = useBasename(createBrowserHistory)({ basename, getUserConfirmation })
    }else {
      history = createBrowserHistory({ getUserConfirmation })
    }
    return history
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'basename', 'hashType', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
