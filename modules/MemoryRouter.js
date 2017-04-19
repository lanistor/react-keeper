import React from 'react'
import Router from './Router'
import createMemoryHistory from 'vhistory/createMemoryHistory'
import { objectWithoutProperties } from './Util'

export default class MemoryRouter extends React.Component {

  constructor(...args) {
    super(...args)
    this.history = this.createHistory()
    this.history.type = 'memory'
  }

  createHistory = ()=> {
    const { initialEntries, initialIndex, getUserConfirmation }  = this.props
    return createMemoryHistory({ initialEntries, initialIndex, getUserConfirmation })
  }

  render() {
    const props  = objectWithoutProperties(this.props,
      [ 'initialEntries', 'initialIndex', 'getUserConfirmation' ])
    return <Router history={ this.history } { ...props } />
  }
}
