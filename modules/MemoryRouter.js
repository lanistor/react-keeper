import Router from './Router'
import createMemoryHistory from 'history/createMemoryHistory'

export default class MemoryRouter extends Router {
}

MemoryRouter.prototype.createHistory = function () {
  const { initialEntries, initialIndex, getUserConfirmation }  = this.props
  return createMemoryHistory({ initialEntries, initialIndex, getUserConfirmation })
}
