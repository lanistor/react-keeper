import React from 'react'
import Header from '../../../common/Header'
import Footer from '../../../common/Footer'
import LeftNav from './LeftNav'

export default class Host extends React.Component {
  render() {
    return (
      <div className="page">
        <Header/>
        <div className="container-fluid">
          <LeftNav/>
          <div className="col-md-10">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
Host.propTypes = {
  children: React.PropTypes.any
}
