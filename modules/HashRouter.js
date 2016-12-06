import Router from './Router'
import createHashHistory from 'history/createHashHistory'

export default class HashRouter extends Router {
}

HashRouter.prototype.createHistory = function () {
  const { basename, hashType, getUserConfirmation }  = this.props
  return createHashHistory({ basename, hashType, getUserConfirmation })
}
