import React from 'react'

//css
import './Search.css'

export default function SearchInput({placeholder,onKeyUp,onFocus,onBlur}) {


  function focusField(event) {
    if(event.target.value.length > 0){
      onFocus();
    }
  }

  function blurField(){
    onBlur();
  }

  return (
    <input 
    className="form-control ds-input"
    onKeyUp={onKeyUp}
    onBlur={onBlur} 
    onFocus={(event) => {if(event.target.value.length > 0) onFocus()}}
    type="text" id="search-input" 
    placeholder={placeholder} 
    autoComplete="off" spellCheck="false" 
    style={{position: "relative", verticalAlign: "top",minWidth: '300px'}}/>
  )
}
