import React from 'react'
import extend from 'extend'
import { hashCode } from './util'

/**
 * @description : create route config by the JSX config 
 * @param elements {Array of ReactElement} : Children of Router Element
 */
export function createRouteConfigByJSX(elements, srcConfig, mergeConfig) {
  srcConfig = srcConfig || {}
  if(!elements || React.Children.count(elements) === 0) {
    return srcConfig
  }
  React.Children.forEach(elements, (element) => {

    if(React.isValidElement(element)) {
      let { path, children, component, rcIndex, enterFilter, leaveFilter, key, ...props } = extend({}, mergeConfig, element.props)
      path = resetPath(path)
      
      /** normal route */
      if(path) {
        let _hashCode = hashCode()

        srcConfig[ path ] = extend(
            { type: component || element.type || undefined, hashCode: _hashCode },
            enterFilter? { enterFilter } : null, leaveFilter? { leaveFilter } : null,
            rcIndex? { rcIndex } : null)

        srcConfig[ path ].props = Object.assign({ key: key || _hashCode }, props)

        if(children) {
          srcConfig[ path ].children = createRouteConfigByJSX(children, {}, null)
        }
      } else {
        /** abstract route */
        createRouteConfigByJSX(children, srcConfig, props)
      }
    }
  })
  return srcConfig
}

/**
 * create route config by user config
 */
export function createRouteConfigByUserConfig(userConfig) {
  return userConfig
}

/**
 * get correct path
 * @method resetPath
 */
function resetPath(path) {
  if(!path) {
    return null
  }
  if(path.charAt(0) !== '/') {
    path = `/${path}`
  }
  if(path.length>1 && path.charAt(path.length-1) === '/') {
    path = path.substring(0, path.length-1)
  }
  return path
}
