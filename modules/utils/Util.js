import React from 'react'

/** compare two objects */
export const compare = (obj1, obj2)=> {
  if(obj1 === obj2) {
    return true
  }
  if(!obj1 || !obj2) {
    return false
  }
  if(typeof(obj1) !== 'object') {
    if(typeof(obj2) === 'object') {
      return false
    }
    if(obj1 !== obj2) {
      return false
    }
    return true
  }

  if(typeof(obj2) !== 'object') {
    return false
  }

  if(size(obj1) !== size(obj2)) {
    return false
  }

  let result
  for(let i in obj1) {
    if(!obj1.hasOwnProperty(i)) {
      continue
    }
    if(!obj2.hasOwnProperty(i)) {
      return false
    }
    result = compare(obj1[i], obj2[i])
    if(!result) {
      return false
    }
  }
  return true
}

/**
 * object without properties
 */
export const objectWithoutProperties = (obj, keys) => {
  const re = {}
  if(!obj || !keys || !(keys instanceof Array) || keys.length === 0) {
    return re
  }
  for(let item in obj) {
    if(arrayContains(keys, item))
      continue
    if(!Object.prototype.hasOwnProperty.call(obj, item))
      continue

    re[item] = obj[item]
  }
  return re
}

/**
 * array contains
 */
export const arrayContains = (array, item) => {
  if(!array || !item || !array.length) {
    return false
  }
  for(let i=0; i< array.length; i++) {
    if(array[i] === item) {
      return true
    }
  }
  return false
}

/** is stateless component */
export const isStatelessComponent = (componentClass)=> {
  return !componentClass.prototype || !componentClass.prototype.render
}

/** is mounted component, will return false when component is umounted */
export const isMountedComponent = (component)=> {
  return !!component._reactInternalInstance
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
export function size (ob) {
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

/** is null */
export function isNull(obj) {
  if(typeof obj === 'undefined' || obj === null) {
    return true
  }
  return false
}

/**
 * get correct path
 * @method resetPath
 */
export function resetPath(path) {
  if(!path) {
    return '/'
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
