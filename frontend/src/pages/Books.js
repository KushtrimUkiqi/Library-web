import React from 'react'

//state
import { useSelector} from 'react-redux';

//hooks
import {useEffect,useState} from 'react';

//stateActions
import { setBookPages,setCurrentPage,setPreviousPage,setNextPage,setTotalPages} from '../state/BookPages';
import { useDispatch } from 'react-redux';

//services
import HttpClientService from '../services/HttpClient';

//components
import BooksList from '../components/Books/BooksList';
import AddBook from '../components/Books/AddBook';
import BooksTopBar from '../components/Books/BooksTopBar'
import Pagination from '../components/shared/Pagination/Pagination';
import { NotificationManager } from 'react-notifications';

export default function Books() {

    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);
    const [error,setError] = useState({error: false, errorMsg: ''});
    const page = useSelector(state => state.bookPages.currentPage);
    const size = useSelector(state => state.bookPages.pageSize);
    

    function reload()
    {
      fetchBooks();
    }

    async function fetchBooks() {
      setLoading(true);

      HttpClientService
        .fetchBooksWithPagination(page,size)
          .then((response) => {
            setBooks([...response.data.content]);
            // dispatch(setBookPages(response.data.totalPages));
            dispatch(setPreviousPage(0));
            dispatch(setCurrentPage(response.data.pageable.number));
            dispatch(setNextPage( !response.data.last ? response.data.number + 1 : -1));
            dispatch(setTotalPages(response.data.totalPages));
          })
          .catch(error => {
            NotificationManager.error('Could not proccess the request', 'Error!', 2000);
          });

      setLoading(false);
    }

    useEffect(() => {
      fetchBooks();
    },[]);

  return (
    <>
    <BooksTopBar></BooksTopBar>
    <AddBook></AddBook>
    <BooksList books={books} error={error} loading={loading} reload={reload}></BooksList>
    <Pagination></Pagination>
    </>
)
}
