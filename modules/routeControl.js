import match from './match'
import React from 'react'
import './util'

class RouteControl {
  constructor() {
    this.pages = {}
  }

  /**
   * [
   *    '/about' : { type, props, children: {
   *        '/about/b': { type, children: [
   *            '/about/b/c': { type, props },
   *            '/about/b/d': { type, props }
   *          ]
   *        }
   *      ]
   *      
   *    }
   * ]
   */
  historyChange = (location)=> {

    let matchResult = match(this.routeConfig, location.pathname)
    let nextPages = matchResult

    if(matchResult.length <= 0) {
      return
    }
    
    let tempPages = nextPages
    let tempConfig = this.routeConfig
    let elements = []
    for(let pattern in tempPages) {
      elements.push(this.createElement( tempConfig[ pattern ], tempPages[ pattern ] ))
    }

    // console.log('--result--', matchResult)
    // console.log('--config--', this.routeConfig)
    // console.log('--elements--', elements)

    this.updatePages(elements, ()=>{
      this.pages = nextPages
    })
  }

  /**
   * create element by match result
   * @method createElement
   * @param {object} item         - operating element config, ruled as this.routeConfig
   * @param {object} match        - match result, ruled as matchResult
   *    {
   *      '/about': {
   *        params : {},
   *        children : {
   *          {
   *            '/a' : { 
   *              params : {},
   *              children : {}
   *            }
   *          }
   *        }
   *      },
   *      '/mine': {
   *        ...
   *      },
   *      params : {}
   *      children : {}
   *    }
   */
  createElement(item, match) {
    if(!match) {
      return null
    }
    return React.createElement(item.type, Object.assign({}, item.props, match.params), 
          Object.size(match.children)==0? null :
            Object.keys(match.children || {}).map((pattern) => {
              return this.createElement(item.children[ pattern ], match.children[ pattern ])
            })
      )
  }

  /**
   * update pages of project
   * @method updatePages
   * @param {Array of ReactElement} pages
   * @param {function} callback
   */
  updatePages(pages, callback) {
    this.controlTarget.setState({ pages: pages }, callback)
  }

  init = (controlTarget, history, routeConfig)=> {
    this.controlTarget = controlTarget
    this.history = history
    this.routeConfig = routeConfig

    this.history.listen(this.historyChange)
    this.hrefClickListner()
  }

  /** href click listener */
  hrefClickListner = ()=> {
    document.body.onclick = (event)=>{
      if(event.target.tagName === 'A') {
        // console.log('')
      }
    }
  }
}

export default new RouteControl()
