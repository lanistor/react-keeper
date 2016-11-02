/**
 * compile path pattern
 * @module compilePattern
 *   1. compile path pattern to regular string
 *   2. extrac param names from path pattern
 * 
 * @param {string} pattern - the pattern defined by property 'path' on the component 'Route'
 */
export default function compilePattern(pattern) {

  let regular = []
  let params = {}
  let _ulrPart = '([0-9a-zA-Z-_$%]+)'
  let _rule = new RegExp(`\\(\\/:${_ulrPart}\\)|:${_ulrPart}|(\\*\\*)|(\\*)`, 'g')

  let _match
  let _lastIndex = 0
  let _index = 0
  
  while((_match = _rule.exec(pattern))) {

    regular.push(pattern.substring(_lastIndex, _match.index))

    if(_match[0] === '**') {

      regular.push('(.*)')

    } else if(_match[0] === '*') {

      regular.push('([^\/]+)')

    } else if(_match[0].indexOf('(/:') === 0) {

      regular.push(`(?:\/${_ulrPart})?`)
      params[_index] = _match[1]

    } else if(_match[0].indexOf(':') === 0) {

      regular.push(`${_ulrPart}`)
      params[_index] = _match[2]

    }

    _lastIndex = _rule.lastIndex
    _index ++ 
  }

  if(_lastIndex < pattern.length) {
    regular.push(pattern.substring(_lastIndex, pattern.length))
  }

  /** followed by `/` or none */
  regular.push('(?=/|$)')
  return {
    regular: regular.join(''),
    params,
    pattern
  }
}
