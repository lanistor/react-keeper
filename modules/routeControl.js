import match from './match'
import React from 'react'
import { 
    set as ControlSet,
    historyChangeSucceed as ControlHistoryChangeSucceed
  }from './OuterControl'

class RouteControl {
  constructor() {
    this.pages = {}
    this.components = []
  }
  
  /**
   * add small component to DOM
   * @method addComponent
   */
  addComponent = (component, callback)=> {
    if(!component) {
      return
    }

    this.components.push(component)
    this.rootRouter.setState({ components: this.components }, callback)
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

    ControlHistoryChangeSucceed()

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
    this.rootRouter.setState({ pages: pages }, callback)
  }

  /**
   * initialize the config
   * @method init
   * @param { ReactElement } rootRouter  - the Router Component to control
   * @param { Object } history              - the history object
   * @param { Object } routeConfig          - the config of route
   */
  init = (rootRouter, history, routeConfig)=> {
    this.rootRouter = rootRouter
    this.history = history
    this.routeConfig = routeConfig

    ControlSet('addComponent', this.addComponent)
    ControlSet('history', this.history)

    this.history.listen(this.historyChange)

    this.hrefClickListner()
  }

  /**
   * trigger history action
   * @method triggerHistory
   */
  triggerHistory() {
    this.historyChange(this.history.location, this.history.action)
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
