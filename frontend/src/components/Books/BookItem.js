import React from 'react'

//images
import editImage from '../../images/edit.svg'

//Router
import { Link } from 'react-router-dom'

export default function BookItem({book,loanBook,returnBook,editBook}) {


  return (
        <div  style={{width: '200px',padding: 0}}>

        <Link key={book.id} to={"/book/" + book.id} className="listStyle">
        <div style={{backgroundImage: `url(${book.imageUrl})`, width: '200px',height: '300px',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}></div>
        </Link>

            <div style={{borderBottom: '1px solid rgba(2,18,43,255)'}}>
                <Link key={book.id} to={"/book/" + book.id} className="listStyle">
                <h6 style={{backgroundColor: 'black',color: 'white',margin: 0}}>{book.name}</h6>
                <p style={{fontSize: 14,fontStyle: 'italic'}}>{`${book.author.name} ${book.author.surname}`}</p>
                </Link>
                <div style={{display: 'flex',alignItems: 'baseline',justifyContent: 'space-between'}}>
                <p style={{fontSize: 12}}>{book.category} </p>
            
                <button onClick={()=> editBook(book)} data-bs-toggle="modal" data-bs-target="#editBook" className='btn btn-primary'>
                    <img src={editImage} alt="edit" />
                </button>
                </div>

                <div style={{display: 'flex',alignItems: 'baseline'}}>
                    <button onClick={() => loanBook(book.id,book.name,`${book.author.name} ${book.author.surname}`)} className="btn btn-success" style={{padding: 1,borderRadius: 0,backgroundColor: 'rgba(2,18,43,255)',borderColor: 'rgba(2,18,43,255)'}} type="submit" data-bs-toggle="modal" data-bs-target="#returnBook">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 10H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </button>
                    <button onClick={() => returnBook(book.id,book.name,`${book.author.name} ${book.author.surname}`)} className="btn btn-danger" style={{padding: 1,borderRadius: 0,backgroundColor: '#AC4918',borderColor: '#AC4918'}} type="submit" data-bs-toggle="modal" data-bs-target="#loanBook">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 10H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </button>
                    <p style={{borderTop: '1px solid rgba(2,18,43,255)',fontSize: 12,textAlign: 'end',flex: '3',paddingTop: '5px',marginLeft: '2px'}}>available copies: {book.availableCopies}</p>
                </div>
                
            </div>
        </div>
  )
}
