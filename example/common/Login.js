import React, { Component } from 'react'
import { Boxer } from 'react-boxer'

export default class Login extends Component {

  remove= ()=> {
    Boxer.remove(this)
  }

  render() {
    return (
      <div className='modal fade-in' style={{ display: 'block' }}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' onClick={ this.remove } className='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span className='sr-only'>Close</span></button>
              <h4 className='modal-title'>{ this.props.title }</h4>
            </div>
            <div className='modal-body'>


              <form className='form-horizontal' role='form'>
                <div className='form-group'>
                  <label htmlFor='inputEmail3' className='col-sm-2 control-label'>Email</label>
                  <div className='col-sm-10'>
                    <input type='email' className='form-control' id='inputEmail3' placeholder='Email'/>
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='inputPassword3' className='col-sm-2 control-label'>Password</label>
                  <div className='col-sm-10'>
                    <input type='password' className='form-control' id='inputPassword3' placeholder='Password'/>
                  </div>
                </div>
              </form>


            </div>
            <div className='modal-footer'>
              <button type='button' onClick={ this.remove } className='btn btn-default' data-dismiss='modal'>Close</button>
              <button type='button' className='btn btn-primary' onClick={ ()=>{ alert('Login') } }>Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
