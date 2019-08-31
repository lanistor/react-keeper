import { Control } from 'react-keeper'

export default (callback, props)=> {
  let pass = false
  if(pass) {
    callback()
  }else {
    alert('Leave Filter Not Permit to Leave.')
    Control.go(-1, null)
  }
}
