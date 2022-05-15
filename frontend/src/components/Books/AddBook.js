import React from 'react'

//react hooks
import { useState, useEffect, useRef} from 'react';

//HTTP client api
import HttpClientService from '../../services/HttpClient';

//notifications
import {NotificationManager} from 'react-notifications';

//image
import close from '../../images/close.svg'

//components
import Loading from '../shared/Loading/Loading'

export default function AddBook({book,reload}) {

  var addBook = book === undefined;

  const [booksCategory,setBooksCategory] = useState([]);
  const [bookAuthors,setBookAuthors] = useState([{value: '', label: ''}]);

    const bookInputRef = useRef('');
    const authorInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const copiesInputRef = useRef(null);
    const coverInputRef = useRef(null);

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
        let name = bookInputRef.current.value;
        let author = authorInputRef.current.value;
        let imageUrl = coverInputRef.current.value;
        let category = categoryInputRef.current.value;
        let copies = copiesInputRef.current.value;

        HttpClientService.addBook(name,imageUrl,category,author,copies)
          .then(response => {
            loading = false;
            resetFields();
            reload();
            NotificationManager.success('Successfully added new book', '');
          })
          .catch(error => {
            loading = false;
            NotificationManager.error('Could not proccess the request', 'Error!', 2000);
          })
    }

    function submitForm(){
      submitform();
    }

    function resetFields()
    {
      bookInputRef.current.value = '';
      authorInputRef.current.value = '';
      coverInputRef.current.value = '';
      categoryInputRef.current.value = '';
      copiesInputRef.current.value = '';
    }


    useEffect(() => {
      fetchBooksCategories();
      fetchBookAuthors();
    },[]);


  return (
    <div className="modal fade" data-bs-backdrop="static" id="addBook" tabIndex="-1" aria-labelledby="addBook" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header" style={{backgroundColor: 'rgba(2,18,43,255)',color: 'white',padding: '2vh 7px',display: 'flex', alignItems: 'flex-end'}}>
                <h6>
                   {`${'ADD NEW BOOK'}`} 
                </h6>
                <button type="button" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: 'var(--main)',border: 'none'}}>
                    <img src={close} alt="close modal" />
        </button>
      </div>
        <div>
        {loading && <Loading></Loading> }
        {!loading &&         
        <div  style={{padding: '0 10px'}}>
        <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book name:</label>
              <input ref={bookInputRef} id='bookName'  className="form-control form-select-sm" type="text"/>
        </div>
        <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book author</label>
              <select ref={authorInputRef} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option selected></option>
                  {bookAuthors.map((author) => <option key={author.value} value={author.value}>{author.label}</option>)}
              </select>
        </div>
        <div className='d-flex justify-content-between'>
        <div className="col-6">
              <label htmlFor="bookName" className="form-label">Book category</label>
              <select ref={categoryInputRef} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option selected></option>
                  {booksCategory.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
        </div>
        <div className="col-4">
              <label htmlFor="bookName" className="form-label">Copies</label>
              <input ref={copiesInputRef} id='bookName'  className="form-control form-select-sm" type="number" min='0'/>
        </div>
        </div>
        {/* <div className="mb-3" style={{display: 'none'}}>
              <input onChange={()=> {}} ref={fileInputRef} style={{display: 'none'}} id='image'  className="form-control" type="file" accept="image/png, image/jpeg"/>
              <button onClick={() => fileInputRef.current.click()} className='btn btn-primary' type='button' style={{backgroundColor: 'rgba(2,18,43,255)',marginTop: '20px'}}>Upload book cover</button>
        </div> */}
        <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book cover image url:</label>
              <input ref={coverInputRef} id='bookName'  className="form-control form-select-sm" type="text"/>
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
