import React from 'react'

//style
import './MainButton.css'

//images
import plus from '../../../../images/plus.svg'

export default function MainButton({text,modalTarget,}) {
  return (
    <button className='btn col-2 btn-primary' id='main-button' 
        data-bs-toggle="modal" data-bs-target={modalTarget}>
            <img src={plus} alt={text} />
            {text}
    </button>
  )
}
