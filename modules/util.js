
/**
 * Object.defineProperty
 * @method defineProperty
 */
export const defineProperty = (ob, property, description) => {
  try {
    Object.defineProperty(ob, property, description)
  }catch(e) {
    // console.log(e)
  }
}

/**
 * get the size of an object
 * 
 * @method size
 * 
 * @param {object} ob    - the object to check
 * 
 * @return {int}         - the size of the object
 */
Object.size = (ob)=> {
  if(!ob)
    return 0
  return Object.keys(ob).length
}

/**
 * get unique hashCode
 * @methdo hashCode - Usually use to create an identify an object
 */
export function hashCode() {
  let res = ''
  for(let i = 0; i < 6; i ++) {
    res += chars[Math.ceil(Math.random() * 35)]
  }
  return res + new Date().getTime()
}

/**
 * get correct path
 * @method resetPath
 */
export function resetPath(path) {
  if(!path) {
    return null
  }
  if(path.charAt(0) !== '/') {
    path = `/${path}`
  }
  if(path.length>1 && path.charAt(path.length-1) === '/') {
    path = path.substring(0, path.length-1)
  }
  return path.replace(/\/{2,}/g, '/')
}

const chars = [ '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ]
