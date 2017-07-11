import { Control } from 'react-keeper'

export default (callback, props)=> {

  let pass = true
  if(pass) {
    callback()
  } else {
    alert('Not Login.')
    Control.go('/', null)
  }
}
