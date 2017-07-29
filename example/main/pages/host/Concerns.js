import React from 'react'
import PropTypes from 'prop-types'

export default class Concerns extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {
      concerns: [
        { id:110, subject: 'react-keeper , more than router of react.', time: 1457789912, user: 'Vifird', face: '/common/attach/user/1.jpg' },
        { id:110, subject: 'react-keeper , more than router of react.', time: 1457789912, user: 'Lisa', face: '/common/attach/user/2.jpg' },
        { id:110, subject: 'react-keeper , more than router of react.', time: 1457789912, user: 'John', face: '/common/attach/user/3.jpg' },
        { id:110, subject: 'react-keeper , more than router of react.', time: 1457789912, user: 'Jasine', face: '/common/attach/user/4.jpg' }
      ]
    }
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.concerns.map((item, index) => {
              return <ConcernItem concern={item} key={index}/>
            })
          }
        </ul>
      </div>
    )
  }
}

class ConcernItem extends React.Component {
  render() {
    return (
      <li>
        <p>
          <a>{this.props.concern.subject}</a>
          <br/>
          <img src={ this.props.concern.face } style={{ maxWidth: '3rem', maxHeight: '3rem' }}/>
          { this.props.concern.user } -
          <span style={{ color:'#aaa' }}>{ new Date(this.props.concern.time).toLocaleString() }</span>
          <br/><br/>
        </p>
      </li>
    )
  }
}
ConcernItem.propTypes = {
  concern: PropTypes.object.isRequired
}
