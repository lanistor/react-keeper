
/**
 * dynamicly put value to History Object
 * mainly called by RouteHistory
 * @method set
 *
 * @param {string} key
 * @param {object} value
 * @return none
 */

export const setHistory = (history)=> {
  HistoryControl.history = history
}

export const listener = (location, action)=> {
  HistoryControl.path = location.pathname
}

export function go(pathOrIndex, state) {
  if(typeof pathOrIndex === 'number') {
    HistoryControl.history.go(pathOrIndex)
  }else {
    if(pathOrIndex === HistoryControl.path)
      return
    if(HistoryControl.history) {
      HistoryControl.history.push(pathOrIndex, state)
      HistoryControl.history.goForward()
    }else {
      setTimeout(()=>{
        if(HistoryControl.history) {
          HistoryControl.history.push(pathOrIndex, state)
          HistoryControl.history.goForward()
        }
      }, 0)
    }
  }
}

export function replace(path, state) {
  HistoryControl.history.replace(path, state)
}

/**
 * export History Object to outer' using
 */
const HistoryControl = {
  path: '/',
  go,
  replace
}

export default HistoryControl
