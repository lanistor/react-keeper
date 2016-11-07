import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

let _history

export default function history(config) {
  // return createBrowserHistory()
  if(!config || config.href) {
    _history = createHashHistory()
  }else {
    _history = createBrowserHistory()
  }
  return _history
}

export function getHistory() {
  return _history
}
