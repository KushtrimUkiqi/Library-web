import React from 'react'

//components
import Pagination from '../shared/Pagination/Pagination'
import LoanItem from './LoanItem'
import LoanTopBar from './LoanTopBar'
import AddLoan from './AddLoan'



export default function LoanContainer({loans}) {
  return (
    <div>
        <LoanTopBar></LoanTopBar>
        <div className="container col-8" style={{padding: '3vh 0',maxHeight: '600px'}}>
        {loans.map((loan,index) => <LoanItem key={index} loan={loan}></LoanItem>
        )}
        </div>
        {loans.length === 0 && (
        <div className="card container col-8">
            <div className="card-header">
                Error
            </div>
        <div className="card-body">
            <p className="card-text">Currently the list of loans is empty, please add new loans.</p>
        </div>
        </div>)
      }
      <AddLoan></AddLoan>
      <Pagination></Pagination>
    </div>
  )
}
