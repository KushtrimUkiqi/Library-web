import React from 'react'

import deleteImage from '../../images/delete.svg'
import editImage from '../../images/edit.svg'
import HttpClientService from '../../services/HttpClient'

export default function AuthorItem({author}) {
  return (
    <div className="card">
    <div className="card-body d-flex justify-content-between align-items-center">
      <div className='d-flex justify-content-around align-items-center'>
        <img src={`${HttpClientService.fetchCountryFlag(author?.country?.name)}`} alt="" height={21.43} width={30} />
        <div className='d-flex justify-content-left align-items-center'> 
        <div style={{width: '25px',height: '0px',border: '1px solid var(--main)',transform: 'rotate(-90deg)',background: 'var(--main)'}}>
        </div> {author.name} {author.surname}</div>
      </div>
      <div className='d-flex justify-content-around align-items-center'>
        <div className='col-2'>
          <img src={deleteImage} alt='delete'/>
        </div>
        <div className='col-2'>
          <img src={editImage} alt='edit'/>
        </div>
      </div>
    </div>
    </div>
  )
}
