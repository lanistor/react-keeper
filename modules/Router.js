import React from 'react'
import history from './history'
import { createRouteConfigByJSX } from './RouteUtil'
import match from './match'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0
    }
    this.history = history(this.props.children)
    this.config = createRouteConfigByJSX(this.props.children)
  }

  /** history change listener */
  historyListner() {
    this.props.history.listen( (location, action) => {
      console.log('--historyListner--', location, action)
      console.log(this.config)
      let result = match(this.config, location.pathname)
      // let one = this.config[result[0].pattern]
      // let i = 0
      // while((one = ))
      // for(let i=0; i<result.length; i++)
      console.log(result)
    })
  }

  /** href click listener */
  hrefClickLisnter() {
    document.body.onclick = (event)=>{
      if(event.target.tagName === 'A') {
        console.log('')
      }
    }
  }

  componentWillMount() {
    this.historyListner()
    this.hrefClickLisnter()
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

Router.propTypes = {
  history: React.PropTypes.object.isRequired,
  children: React.PropTypes.array
}
