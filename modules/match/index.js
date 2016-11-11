import matchPath from './matchPath'
import { resetPath } from '../Util'

/**
 * The entry, match patterns with path
 * @module match
 * 
 * @param {object} rules     - the rules created by the path patterns
 * @param {string} path      - the path of the location
 * 
 * @return {
 *   '/about' : {
 *     params : {}
 *     children : {
 * 
 *     }
 *   }
 * }
 */
export default function match(config, path) {
  
  path = resetPath(path)

  let result = {}
  let tempResult = result
  let matcher
  let tempConfig = config
  let matched
  let matchLastIndex = 0
  while( tempConfig && Object.size(tempConfig) > 0) {

    matched = false

    for(let pattern in tempConfig) {

      matcher = matchPath(matchLastIndex>0? path.substring(matchLastIndex) : path, pattern)
      if(!matcher.match) {
        continue
      }

      matched = true
      let { children } = tempConfig[pattern]
      tempResult[ matcher.pattern ] = {}
      tempResult[ matcher.pattern ].params = matcher.params
      tempConfig = children

      if(tempConfig && Object.size(tempConfig)>0) {
        tempResult = tempResult[ matcher.pattern ].children = {}
      }
      
      break
    }

    matchLastIndex = matchLastIndex + matcher.lastIndex

    if(!matched) {
      tempConfig = null
    }
  }
  return result
}
