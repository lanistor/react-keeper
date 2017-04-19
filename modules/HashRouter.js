import React from 'react'
import Router from './Router'
import createHashHistory from 'vhistory/createHashHistory'
import useBasename from 'vhistory/useBasename'
import { objectWithoutProperties, resetPath } from './Util'

export default class HashRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
    this.history.type = 'hash'
  }

  createHistory = ()=> {
    let { basename, hashType, getUserConfirmation }  = this.props
    if(basename && !/^(\.|\/)/.test(basename))
      basename = resetPath(basename)
    if(basename) {
      return useBasename(createHashHistory)({ basename, hashType, getUserConfirmation })
    }else {
      return createHashHistory({ hashType, getUserConfirmation })
    }
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'basename', 'hashType', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
