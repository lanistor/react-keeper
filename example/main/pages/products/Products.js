import Header from '../../../common/Header'
import Footer from '../../../common/Footer'
import LeftNav from './LeftNav'
import React from 'react'

export default class Products extends React.Component {

  render() {
    return (
      <div className="page">
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <LeftNav item={1}/>
            <div className="col-md-10">
              <h1>{this.props.children}</h1>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
Products.propTypes = {
  children: React.PropTypes.any
}
