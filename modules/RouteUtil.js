import React from 'react'
import extend from 'extend'

/**
 * @description : create route config by the JSX config 
 * @param elements {Array of ReactElement} : Children of Router Element
 */
export function createRouteConfigByJSX(elements, srcConfig, mergeConfig) {
  srcConfig = srcConfig || {}
  if(!elements || React.Children.count(elements) === 0) {
    return srcConfig
  }
  React.Children.forEach(elements, (element)=>{
    if(React.isValidElement(element)) {
      let { path, children, ...props } = extend({}, mergeConfig, element.props)
      
      /** normal route */
      if(path) {
        srcConfig[ path || '' ] = extend(props, { route: element })
        if(children) {
          srcConfig[ path || '' ].children = createRouteConfigByJSX(children, {}, null)
        }
      }else {
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
