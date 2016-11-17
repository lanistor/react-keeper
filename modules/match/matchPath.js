import compilePattern from './compilePattern'

/**
 * match path with pattern
 * @module matchPath
 *   1. check if the path matches the pattern
 *   2. retract param values by param names from the path
 * 
 * @param {string} path         - the path of next location
 * @param {string} pattern      - the pattern defined by property 'path' on the component 'Route'
 * 
 * @return {object} {
 *     match: {boolean}         - match result
 *     params: {object}         - param names & param values of the path
 *   }
 */
export default function matchPath(path, pattern) {
  if(!patterns[pattern]) {
    patterns[pattern] = compilePattern(pattern)
  }

  let patternCompile = patterns[pattern]
  let regular = new RegExp(patternCompile.regular, 'g')
  let match = regular.exec(path)
  
  if(!match) {
    return { match : false }
  }

  let matchers = match.splice(1)
  let params = {}
  if(patternCompile.params) {
    for(let index in patternCompile.params) {
      params[patternCompile.params[index]] = matchers.length > index ? matchers[index] : null
    }
  }

  return {
    pattern,
    match: true,
    params,
    lastIndex: regular.lastIndex
  }
}

/**
 * @property {object} patterns  - record the patterns(with param names) of the paths
 */
let patterns = {}
