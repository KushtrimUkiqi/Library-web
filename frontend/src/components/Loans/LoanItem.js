import React from 'react'

//images
import deleteImage from '../../images/delete.svg'
import editImage from '../../images/edit.svg'


export default function LoanItem({loan}) {
    return (
        <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className='d-flex justify-content-around align-items-center'>
            <div className='d-flex justify-content-left align-items-center'> 
            </div> {loan.loanDue} {loan.customer} - {loan.book}</div>
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
      )
}
