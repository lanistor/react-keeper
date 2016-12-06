import Router from './Router'
import createBrowserHistory from 'history/createBrowserHistory'

export default class BrowserRouter extends Router {
}

BrowserRouter.prototype.createHistory = function () {
  const { basename, hashType, getUserConfirmation }  = this.props
  return createBrowserHistory({ basename, hashType, getUserConfirmation })
}
