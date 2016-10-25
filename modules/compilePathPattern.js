
export default function compilePathPattern(pattern) {
  let regexpSource = ''
  const paramNames = []
  const tokens = []

  let match, lastIndex = 0, matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g
  while ((match = matcher.exec(pattern))) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index))
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index))
    }

    if (match[1]) {
      regexpSource += '([^/]+)'
      paramNames.push(match[1])
    } else if (match[0] === '**') {
      regexpSource += '(.*)'
      paramNames.push('splat')
    } else if (match[0] === '*') {
      regexpSource += '(.*?)'
      paramNames.push('splat')
    } else if (match[0] === '(') {
      regexpSource += '(?:'
    } else if (match[0] === ')') {
      regexpSource += ')?'
    }

    tokens.push(match[0])

    lastIndex = matcher.lastIndex
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length))
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length))
  }

  return {
    pattern,
    regexpSource,
    paramNames,
    tokens
  }
}