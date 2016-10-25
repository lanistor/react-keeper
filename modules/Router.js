import React from 'react'
import { history } from 'react-control'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      status: 0
    }
  }

  /** history change listener */
  historyListner() {
    this.props.history.listen( (location, action) => {
      console.log('--historyListner--', location, action)
    })
    this.hrefClickLisnter()
  }

  /** href click listener */
  hrefClickLisnter() {
    document.body.onclick = (event)=>{
      if(event.target.tagName === 'A') {
        // event.preventDefault()
      }
    }
  }

  componentWillMount() {
    this.historyListner()
    this.hrefClickLisnter()
    this.config = history(this.props.children)
    console.log(this.config)
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
