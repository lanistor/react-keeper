import Header from '../../../common/Header'
import Footer from '../../../common/Footer'
import LeftNav from './LeftNav'
import React from 'react'

export default function Products(props) {
  return (
    <div className="page">
      <Header/>
      <div className="container-fluid">
        <div className="row">
          <LeftNav/>
          <div className="col-md-10">
            <h1>{props.children}</h1>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
Products.propTypes = {
  children: React.PropTypes.any
}
