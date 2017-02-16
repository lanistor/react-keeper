import React from 'react'
import { Route } from 'react-keeper'
import Test from './Test'

export default class HostInfo extends React.Component {
  render() {
    return (
      <div>
        HostInfo
        <Route miss path='*' component={ Test }/>
      </div>
    )
  }
}
