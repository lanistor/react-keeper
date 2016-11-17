import match from './match'
import React from 'react'
import { reactContains } from './Util'

let routeMatch = []

const clearMatch = () => {
  routeMatch = []
}

const addMatch = (instance) => {
  routeMatch.push(instance)
}

const removeMatch = (instance) => {
  routeMatch.forEach((item, index)=>{
    if(item === instance) {
      routeMatch = routeMatch.splice(index, 1)
      return
    }
  })
}

const shouldMatch = (instance, add) => {
  let match = false
  if(routeMatch.length === 0) {
    match = true
  }else{
    match = reactContains(routeMatch[ routeMatch.length-1 ], instance)
  }
  if(match && add) {
    addMatch(instance)
  }
  return match
}

const test = ()=> {
  console.log('--routeMatch--', routeMatch)
}

export {
  clearMatch,
  addMatch,
  removeMatch,
  shouldMatch,
  test
}
