import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

export default function history(config) {
  // return createBrowserHistory()
  if(!config || config.href) {
    return createHashHistory()
  }else {
    return createBrowserHistory()
  }
}
