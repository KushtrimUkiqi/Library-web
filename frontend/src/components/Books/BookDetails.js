import React from 'react'

//hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//notification manager
import NotificationManager from 'react-notifications/lib/NotificationManager';

//images
import editImage from '../../images/edit.svg'
import removeImage from '../../images/delete.svg'

//httpClient
import HttpClientService from '../../services/HttpClient';

//components
import LoanBook from './LoanBook';
import ReturnBook from './ReturnBook';
import EditBook from './EditBook';

export default function BookDetails() {

    //id represents the id of the book that will be displayed 
    const {id} = useParams();


    const navigate = useNavigate()

    const [bookDetails,setBookDetails] = useState({})

    async function fetchBookDetails()
    {
        HttpClientService.fetchBook(id)
        .then(response => {
            setBookDetails(response.data)
        })
        .catch(error => 
            {
                console.log(error)
            })
    }


    function reload()
    {
        fetchBookDetails();
    }

    function editBook()
    {}

    function loanBook()
  {
    // setDisplayLoanBookModal(true);
    // setBookState({id: id,bookName: name,author: author})
  }

    function returnBook()
    {
        // setDisplayReturnBookModal(true);
        // setBookState({id: id,bookName: name,author: author})
    }

    function removeBook()
    {

        HttpClientService.removeBook(bookDetails.id)
        .then(response =>
            {
                NotificationManager.success('The book is removed', '');
                navigate("/books", { replace: true });
            })
        .catch(err =>
            NotificationManager.error('Could not proccess the request', 'Error!', 2000))
    }

    useEffect(() => {
        fetchBookDetails();
      },[]);

  return (
        <>
            <div className='d-flex' style={{width: '70%', margin: 'auto',padding: '10px'}}>
                <div 
                    style={{backgroundImage: `url(${bookDetails.imageUrl})`,
                     width: '295px',
                     height: '450px',
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover'}}>
                </div>
            
                <div style={{paddingLeft: '60px'}}>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                    <button onClick={()=> editBook(bookDetails)} data-bs-toggle="modal" data-bs-target="#editBook" className='btn btn-primary'>
                    <img src={editImage} alt="edit" />
                    </button>
                    <button onClick={()=> removeBook()} data-bs-toggle="modal" className='btn'>
                    <img src={removeImage} alt="edit" />
                    </button>
                    </div>
                    <div>NAME: {bookDetails.name}</div>
                    <div>AUTHOR: {bookDetails.author}</div>
                    <div>CATEGORY: {bookDetails.category}</div>
                    <div style={{display: 'flex',alignItems: 'baseline'}}>
                    <button onClick={() => loanBook()} className="btn btn-success" style={{padding: 1,borderRadius: 0,backgroundColor: 'rgba(2,18,43,255)',borderColor: 'rgba(2,18,43,255)'}} type="submit" data-bs-toggle="modal" data-bs-target="#returnBook">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 10H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </button>
                    <button onClick={() => returnBook()} className="btn btn-danger" style={{padding: 1,borderRadius: 0,backgroundColor: '#AC4918',borderColor: '#AC4918'}} type="submit" data-bs-toggle="modal" data-bs-target="#loanBook">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 10H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </button>
                    <p style={{borderTop: '1px solid rgba(2,18,43,255)',fontSize: 18,textAlign: 'end',flex: '3',paddingTop: '5px',marginLeft: '2px'}}>available copies: {bookDetails.availableCopies}</p>
                </div>
                </div>

            </div>
            <EditBook book={bookDetails} reload={reload}></EditBook>

            <LoanBook book={bookDetails} reload={reload}></LoanBook>

            <ReturnBook book={bookDetails} reload={reload}></ReturnBook>
        </>
  )
}
