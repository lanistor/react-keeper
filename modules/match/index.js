import matchPath from './matchPath'

/**
 * The entry, match patterns with path
 * @module match
 * 
 * @param {object} rules     - the rules created by the path patterns
 * @param {string} path      - the path of the location
 * 
 * @return 
 */
export default function match(config, path) {

  let result = []
  let matcher
  let tempConfig = config
  let matched
  while( tempConfig && Object.keys(tempConfig).length > 0) {

    matched = false

    for(let pattern in tempConfig) {

      matcher = matchPath(path, pattern)
      if(!matcher.match)
        continue
      
      matched = true
      result.push(matcher)
      tempConfig = tempConfig[pattern].children
      break
    }

    if(!matched) {
      tempConfig = null
    }
  }
  return result
}
