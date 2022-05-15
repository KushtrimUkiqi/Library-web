import React from 'react'

export default function AuthorsTopBar() {
  return (
    <div className='container col-10' style={{display: 'flex',paddingTop: '2vh'}}>
        <button className='btn' style={{color: 'white',backgroundColor: 'rgba(2,18,43,255)',borderColor: 'rgba(2,18,43,255)'}} data-bs-toggle="modal" data-bs-target="#addAuthor">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add new author
        </button>
    </div>
  )
}
