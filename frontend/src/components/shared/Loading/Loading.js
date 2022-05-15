import React from 'react'

import './Loading.css';

export default function Loading({style}) {
  return (
    <div className="lds-ripple" style={style}>
      <div></div><div></div>
    </div>
  )
}
