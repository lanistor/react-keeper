import React from 'react'
import { Boxer, Box } from 'react-boxer'
import Ad from './Ad'

export default class Ads extends React.Component {

  componentDidMount() {
    let timer = setInterval(() => {

      // add one ad to container
      Boxer.add(
        <Ad time={'time-' + new Date()} title='One Ad' />,
        1
      )

    }, 1000)

    setTimeout(()=> {

      // if(confirm('Stop and remove all?')) {
      clearInterval(timer)

      // clear all component in the container
      Boxer.clear(1)
      // }

    }, 3000)
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
