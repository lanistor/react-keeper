import RouteControl from './RouteControl'
import { defineProperty } from './Util'

/**
 * dynamicly put value to Control Object
 * mainly called by RouteControl
 * @method set
 * 
 * @param {string} key
 * @param {object} value
 * @return none
 */
export function set(key, value) {
  Control[key] = value
}

export function go(path, state) {
  
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
  addComponent: null,
  path: '/'
}

export default Control
