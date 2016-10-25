import createBrowserHistory from 'history/lib/createBrowserHistory'
import createHashHistory from 'history/lib/createHashHistory'

export default function history(config) {
  if(!config || config.href) {
    return createHashHistory()
  }else {
    return createBrowserHistory()
  }
}
