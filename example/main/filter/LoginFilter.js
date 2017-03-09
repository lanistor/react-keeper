import { Control } from 'react-keeper'

export default (callback, props)=> {

  let pass = false
  if(pass) {
    callback()
  } else {
    alert('Not Login.')
    Control.go('/', null)
  }
}
