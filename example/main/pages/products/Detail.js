import React from 'react'

export default function Detail(props) {
  return (
    <div>
      <hr/>
      Detail<br/>
      id: {props.params? props.params.id : null}<br/>
      time: {props.time}
    </div>
  )
}
