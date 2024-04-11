import React from 'react'

export default function Profile(props) {
  console.log(props.state);
  const isOpen = props.state;

  return (
    <div className={`${isOpen ? 'w-3/5' : 'w-0'}`}>

    </div>
  )
}
