import React from 'react'
import HttpClientService from '../../services/HttpClient';
import { useState ,useRef} from 'react';

//image
import close from '../../images/close.svg'

export default function LoanBook({book}) {

    const [userID,setUserID] = useState(0);
    const [dueDate,setDueDate] = useState(Date.now());
    const id = useRef(1);
    const name = useRef('');
    const dateDue = useRef('');

    function displayMessage(message)
    {
        alert(message);
    }

    function fetchUser(){
        
    }

    function loanBook(bookID)
    {
        let userId = id.current.value;
        let dueDate = dateDue.current.value;
        console.log(userId,dueDate);
        HttpClientService
            .loan(userId,bookID,dueDate)
                .then(resp => {
                    alert("successfully loaned the book");
                }).catch(resp => {
                    alert('not ');
                })
    }
  return (
        <div className="modal fade" data-bs-backdrop="static" id="loanBook" tabIndex="-1" aria-labelledby="loanBook" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header" style={{backgroundColor: 'rgba(2,18,43,255)',color: 'white',padding: '2vh 7px',display: 'flex', alignItems: 'flex-end'}}>
                <h6>
                   {`${'LOAN THE BOOK: '} ${book.bookName} - ${book.author}`} 
                </h6>
                <button type="button" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: 'var(--main)',border: 'none'}}>
                    <img src={close} alt="close modal" />
                </button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
            <label htmlFor="customer" className="form-label">Customer id:</label>
            <input id='customer' ref={id} className="form-control" type="number" min={0} placeholder="0" aria-label="default input example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="customer" className="form-label">Customer fullname:</label>
            <input id='customer' ref={name} className="form-control" type="text" placeholder="Kushtrim Ukiqi" aria-label="default input example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="until" className="form-label">Loan due date:</label>
            <input id="until" className="form-control" type="date" ref={dateDue} />
            </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={() => loanBook(book.id)} style={{backgroundColor: 'rgba(2,18,43,255)'}} type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
  )
}
