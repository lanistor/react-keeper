import routeControl from './routeControl'
import { defineProperty } from './Util'

/**
 * dynamicly put value to Control Object
 * mainly called by routeControl
 * @method set
 * 
 * @param {string} key
 * @param {object} value
 * @return none
 */
export function set(key, value) {
  Control[key] = value
  
  if(key === 'history') {
    Control['location'] = Control.history.location
  }
}

/**
 * set path
 */
export function historyChangeSucceed() {

  /** set path property */
  if(!Control.history || !Control.history.location) {
    return
  }
  Control['path'] = Control.history.location.pathname
}

/**
 * export Control Object to outer' using
 */
const Control = {
  history: null,
  addComponent: null,
  path: '/',
  location: null
}

export default Control
