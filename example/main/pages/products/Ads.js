import React from 'react'
import { FlexContainer, Flex } from 'react-flex-router'
import Ad from './Ad'

export default class Ads extends React.Component {

  componentDidMount() {
    let timer = setInterval(() => {

      // add one ad to container
      Flex.add(
        <Ad time={'time-' + new Date()} title='One Ad' />,
        1
      )

    }, 1000)

    setTimeout(()=> {

      if(confirm('Stop and remove all?')) {
        clearInterval(timer)

        // clear all component in the container
        Flex.clear(1)
      }

    }, 3000)
  }
  

  render() {
    return (
      <div>
        <h3>Dynamic Ads, it may be a float panel to place ads.</h3>
        <FlexContainer index={1}/>
      </div>
    )
  }
}
