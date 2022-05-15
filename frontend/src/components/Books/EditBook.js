import React from 'react'
import { useState, useEffect, useRef} from 'react';
import HttpClientService from '../../services/HttpClient';

export default function EditBook({book}) {


    const [booksCategory,setBooksCategory] = useState([]);
    const [bookAuthors,setBookAuthors] = useState([{value: '', label: ''}]);
  
    const modal = useRef();

      const bookID = book.id;
      const bookInputRef = useRef(book.name);
      const authorInputRef = useRef(book??book.authorID);
      const categoryInputRef = useRef(book??book.category);
      const copiesInputRef = useRef(book??book.availableCopies);
      const coverInputRef = useRef(book??book.imageUrl);
  
      let loading = false;
  
      async function fetchBooksCategories() {
        HttpClientService
          .fetchCategories()
            .then((response) => {
              setBooksCategory([...response.data]);
            })
            .catch(error => {
              console.log('error')
            })
      }
  
      async function fetchBookAuthors(){
        HttpClientService
        .fetchAuthors()
          .then((response) => {
            setBookAuthors(response.data.map(element => {
              { return {value: `${element.id}`, label: `${element.name} ${element.surname}`}}
            }));
          })
          .catch(error => {
            console.log(error)
          })
      }
  
      async function submitform(){
        loading = true;
        let id = bookID;
          let name = bookInputRef.current.value;
          let author = authorInputRef.current.value;
          let imageUrl = coverInputRef.current.value;
          let category = categoryInputRef.current.value;
          let copies = copiesInputRef.current.value;
          HttpClientService
            .editBook(id,name,imageUrl,category,author,copies)
              .then(response => {
              }).catch((error) => {
                console.log()
              })
        loading = false;
      }
  
      function submitForm(){
        submitform();
      }
  
  
      useEffect(() => {
        fetchBooksCategories();
        fetchBookAuthors();
      },[]);
  
  
    return (
      <div ref={modal} className="modal fade" data-bs-backdrop="static" id="editBook" tabIndex="-1" aria-labelledby="editBook" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header" style={{backgroundColor: ''}}>
            <h5 className="modal-title" id="exampleModalLabel">Edit book</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div>
          {loading && <div className="lds-ellipsis">HELLO<div></div><div></div><div></div><div></div></div> }
          {!loading &&         
          <div  style={{padding: '0 10px'}}>
          <div className="mb-3">
                <label htmlFor="bookName" className="form-label">Book name:</label>
                <input defaultValue={book.name} ref={bookInputRef} id='bookName'  className="form-control form-select-sm" type="text"/>
          </div>
          <div className="mb-3">
                <label htmlFor="bookName" className="form-label">Book author</label>
                <select defaultValue={book.author} ref={authorInputRef} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    {bookAuthors.map((author) => <option key={author.value} value={author.value}>{author.label}</option>)}
                </select>
          </div>
          <div className='d-flex justify-content-between'>
          <div className="col-6">
                <label htmlFor="bookName" className="form-label">Book category</label>
                <select defaultValue={book.category} ref={categoryInputRef} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    {booksCategory.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
          </div>
          <div className="col-4">
                <label htmlFor="bookName" className="form-label">Copies</label>
                <input defaultValue={book.availableCopies} ref={copiesInputRef} id='bookName'  className="form-control form-select-sm" type="number" min='0'/>
          </div>
          </div>
          {/* <div className="mb-3" style={{display: 'none'}}>
                <input onChange={()=> {}} ref={fileInputRef} style={{display: 'none'}} id='image'  className="form-control" type="file" accept="image/png, image/jpeg"/>
                <button onClick={() => fileInputRef.current.click()} className='btn btn-primary' type='button' style={{backgroundColor: 'rgba(2,18,43,255)',marginTop: '20px'}}>Upload book cover</button>
          </div> */}
          <div className="mb-3">
                <label htmlFor="bookName" className="form-label">Book cover image url:</label>
                <input defaultValue={book.imageUrl} ref={coverInputRef} id='bookName'  className="form-control form-select-sm" type="text"/>
          </div>
          </div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onClick={() => submitForm()} style={{backgroundColor: 'rgba(2,18,43,255)'}} type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    )
}
