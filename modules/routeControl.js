import match from './match'
import React from 'react'
import { reactContains, resetPath } from './Util'

/** record the matched component by asc order */
let routeMatch = []

/** clear all matched component, used when path changed */
const clearMatch = () => {
  routeMatch = []
}

/** when a component matched the path and should to be mount, record it */
const addMatch = (instance) => {
  if(routeMatch.length > 0) {
    routeMatch.forEach((item)=>{
      if(item === instance) {
        return
      }
    })
  }
  routeMatch.push(instance)
}

/** get match component */
const getMatch = (index)=> {
  if(routeMatch.length === 0) {
    return null
  }
  if(index < 0 || index >= routeMatch.length) {
    return routeMatch[ routeMatch.length-1 ]
  }
  return routeMatch[index]
}

/** get matched path, all components matched will be counted */
const getMatchedPath = ()=> {
  if(routeMatch.length === 0) {
    return ''
  }
  const path = []
  routeMatch.forEach((item)=> {
    if(item.matcher)
      path.push(item.matcher.matchStr)
  })
  return path.join('')
}

/**
 * get addtive mathced component path
 * different with getMatchedPath
 */
const getSelfPathname = (obj)=> {
  if(!obj.context) {
    return ''
  }
  const path = [];
  (obj.context.routes || []).forEach((item)=> {
    // path.push(resetPath(item.props.path))
    path.push(item.matcher.matchStr)
  })
  path.push(obj.matcher.matchStr)
  return path.join('')
}

/** when a component unmount, remove it */
const removeMatch = (instance) => {
  routeMatch.forEach((item, index)=>{
    if(item === instance) {
      routeMatch = routeMatch.splice(index, 1)
      return
    }
  })
}

/**
 * 'index' property support
 * when no component matched, this one will match if condition
 * the condition is 'when no matched, it's parent is last matched one'
 */
const checkMissMatch = (child) => {
  const parent = routeMatch.length>0? routeMatch[0] : ''
  if(!child) {
    return
  }
  setTimeout(()=> {
    if(routeMatch.length===0) {
      if(parent === '') {
        child.setToMount()
      }
      return
    }
    if(routeMatch[routeMatch.length-1] === parent) {
      child.setToMount()
      return
    }
  }, 0)
}

/**
 * to judge if a component should match
 * the condition is 'if it's the direct child of last matched component'
 */
const shouldMatch = (instance) => {
  let match = false
  if(routeMatch.length === 0) {
    match = true
  }else{
    match = reactContains(routeMatch[ routeMatch.length-1 ], instance)
  }
  return match
}

export {
  clearMatch,
  addMatch,
  removeMatch,
  shouldMatch,
  getMatch,
  getMatchedPath,
  getSelfPathname,
  checkMissMatch
}
