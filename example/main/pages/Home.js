import Header from '../../common/Header'
import Footer from '../../common/Footer'
import React from 'react'

export default function Home(props) {

  return (
    <div className='page'>
      <Header/>
      <div className='container-fluid'>
        <h1>Home</h1>
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}
