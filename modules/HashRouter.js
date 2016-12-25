import React from 'react'
import Router from './Router'
import createHashHistory from 'history/createHashHistory'
import { objectWithoutProperties } from './Util'

export default class BrowserRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
  }

  createHistory = ()=> {
    const { basename, hashType, getUserConfirmation }  = this.props
    return createHashHistory({ basename, hashType, getUserConfirmation })
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'basename', 'hashType', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
