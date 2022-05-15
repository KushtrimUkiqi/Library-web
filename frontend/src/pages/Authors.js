import React from 'react';

//hooks
import { useState, useEffect } from 'react';

//services
import HttpClientService from '../services/HttpClient';

//components
import AuthorsContainer from '../components/Authors/AuthorsContainer';


export default function Authors() {
    const [authors,setAuthors] =  useState([]);

    async function fetchAuthors() {
        HttpClientService
          .fetchAuthors()
            .then((response) => {
              setAuthors([...response.data]);
            })
            .catch(error => {
              console.log('error')
            })
      }

      useEffect(()=> {
        fetchAuthors();
      },[]);

  return (
    <>
     <AuthorsContainer authors={authors}></AuthorsContainer>
    </>
  )
}
