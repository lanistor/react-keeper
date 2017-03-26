import React from 'react'
import Router from './Router'
import createHashHistory from 'history/createHashHistory'
import { objectWithoutProperties } from './Util'

export default class HashRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
    this.history.type = 'hash'
  }

  createHistory = ()=> {
    let { basename, hashType, getUserConfirmation }  = this.props
    if(!/^(\.|\/)/.test(basename))
      basename = resetPath(basename)
    return createHashHistory({ basename, hashType, getUserConfirmation })
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'basename', 'hashType', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
