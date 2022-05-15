import React from 'react';

//hooks
import { useState, useEffect } from 'react';

//services
import HttpClientService from '../services/HttpClient';

//components
import LoanContainer from '../components/Loans/LoanContainer'


export default function Loans() {
    const [loans,setLoans] =  useState([]);

    async function fetchLoans() {
        HttpClientService
          .fetchLoansWithPagination(0,100)
            .then((response) => {
              setLoans([...response.data]);
            })
            .catch(error => {
              console.log('error')
            })
      }

      useEffect(()=> {
        fetchLoans()
      },[]);

  return (
    <>
     <LoanContainer loans={loans}></LoanContainer>
    </>
  )
}
