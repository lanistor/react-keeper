import match from './match'
import React from 'react'
import { reactContains } from './Util'

/** record the matched component by asc order */
let routeMatch = []

/** clear all matched component, used when path changed */
const clearMatch = () => {
  routeMatch = []
}

/** when a component matched the path and should to be mount, record it */
const addMatch = (instance) => {
  routeMatch.push(instance)
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
  checkMissMatch
}
