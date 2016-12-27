import { isNull, hashCode } from '../Util'
import Logger from '../Logger'
import React from 'react'

/** add element to target container */
export const addElement = (element, index)=> {
  index = getIndex(index)
  if(!containers[index]) {
    Logger.error(ErrorMsg.ContainerNotFound)
    return false
  }
  containers[index].elements.push(cloneElement(element))
  containers[index].container.updateElementsData()
  return true
}

/** remove target element by it's component' */
export const removeElement = (component)=> {
  let targetElementHashCode = component.props['ROUTER_HASHCODE']
  let elements
  let removed = false, itemRemoved = false

  for(let index in containers) {
    elements = containers[index].elements
    if(!elements) {
      continue
    }
    itemRemoved = false
    for(let i=0; i<elements.length; i++) {
      if(elements[i].props['ROUTER_HASHCODE'] === targetElementHashCode) {
        elements.splice(i, 1)
        removed = true
        itemRemoved = true
        break
      }
    }
    if(itemRemoved) {
      containers[index].container.updateElementsData()
    }
  }
  return removed
}

/** clear elements by index */
export const clearElement = (index)=> {
  index = getIndex(index)
  if(!containers[index]) {
    Logger.error(ErrorMsg.ContainerNotFound)
    return false
  }
  containers[index].elements = []
  containers[index].container.updateElementsData()
}

/** add container */
export const addContainer = (container, index)=> {
  index = getIndex(index)
  if(containers[index] && containers[index] === container) {
    Logger.warning(ErrorMsg.ContainerAddedAlready)
    return true
  }
  containers[index] = {
    container: container,
    elements: []
  }
  return true
}

/** remove container */
export const removeContainer = (index)=> {
  index = getIndex(index)
  if(!containers[index]) {
    Logger.error(ErrorMsg.ContainerNotFound)
    return true
  }
  delete containers[index]
}

/** get elements by index */
export const getElements = (index)=> {
  index = getIndex(index)
  if(!containers[index]) {
    Logger.error(ErrorMsg.ContainerNotFound)
    return []
  }
  return containers[index].elements || []
}

/** get ruled index */
export const getIndex = (index)=> {
  if(isNull(index)) {
    return '0'
  }
  return index + ''
}

/** cloneElement */
const cloneElement = (element)=> {
  return React.cloneElement(element, {
    'ROUTER_HASHCODE': hashCode(),
    key: element.props.key || 'ROUTER_AUTOKEY_'+hashCode()
  })
}

const containers = {
  /**
   * '0': {
   *   'container': object
   *   'elements': [
   *      element1,
   *      element2
   *    ]
   * },
   * '1': {
   *
   * }
   */
}

let ErrorMsg = {
  ContainerNotFound: 'FlexContainer not found, it may be unmount already.',
  ContainerAddedAlready: 'FlexContainer is added already.'
}
