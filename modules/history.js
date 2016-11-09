import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'

let history
let historyType = null

/**
 * create history Object
 * @module history
 * 
 * @param config {
 *  type: {string}      - the type of history : hash、browser、memory
 *  ...
 * }
 */
export default function createHistory(config) {
  console.log(config)
  config = Object.assign({ type: 'hash' }, config)
  const { type, ...props } = config
  historyType = type || 'hash'

  switch(historyType) {
    case 'browser':
      history = createBrowserHistory(props)
      break
    case 'memory':
      history = createMemoryHistory(props)
      break
    default:
      history = createHashHistory(props)
      break
  }
  console.log(historyType, history)
  return history
}

function getHistory() {
  return history
}

function getHistoryType() {
  return historyType
}

createHistory.getHistory = getHistory
createHistory.getHistoryType = getHistoryType
