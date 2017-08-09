import React from 'react'
import { Boxer, Box } from 'react-boxer'
import Ad from './Ad'

export default class Ads extends React.Component {

  componentDidMount() {
    this.interval = setInterval(() => {

      // add one ad to container
      Boxer.add(
        <Ad time={'time-' + new Date()} title='One Ad' />,
        1
      )

    }, 1000)

    this.timer = setTimeout(()=> {

      // if(confirm('Stop and remove all?')) {
      clearInterval(this.interval)

      // clear all component in the container
      Boxer.clear(1)
      // }

    }, 3000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
    window.clearTimeout(this.timer)
  }
  
  render() {
    return (
      <div>
        <h3>Dynamic Ads, it may be a float panel to place ads.</h3>
        <Box index={1}/>
      </div>
    )
  }
}
