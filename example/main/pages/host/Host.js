import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../../common/Header'
import Footer from '../../../common/Footer'
import LeftNav from './LeftNav'
import { Route } from 'react-keeper'
import HostInfo from './HostInfo'
import Edit from './Edit'
import Concerns from './Concerns'

export default class Host extends React.PureComponent {
  render() {
    return (
      <div className='page'>
        <Header/>
        <div className='container-fluid'>
          <LeftNav/>
          <div className='col-md-10'>

            <Route cache='parent' index component={HostInfo} path='/info'/>
            <Route cache='root' component={Edit} path='edit' leaveFilter={[ 'editLeave' ]}/>
            <Route miss path='concerns' component={Concerns}/>

          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

Host.propTypes = {
  children: PropTypes.any
}
