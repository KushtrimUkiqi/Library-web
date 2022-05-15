import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import React from 'react';
import {NotificationContainer} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

//hooks
import { useEffect } from 'react';

//state
import {addAllCategories} from './state/Categories';
import { useDispatch } from 'react-redux';
import { setAuth } from './state/UserAuth'

//api
import  HttpClientService  from './services/HttpClient';

//components
import Nav from './components/shared/Navbar/Navbar';
import Books from './pages/Books';
import Authors from './pages/Authors';
import Home from './pages/Home';
import BookDetails from './components/Books/BookDetails';
import Login from './pages/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Loans from './pages/Loans';

function App() {

  const dispatch = useDispatch();

  async function fetchBooksCategories() {
    HttpClientService
      .fetchCategories()
        .then((response) => {
          dispatch(addAllCategories([...response.data]));
        })
        .catch(error => {
          console.log('error')
        })
  }

  const setAuthentication = () =>
  {
    const token  = localStorage.getItem("JWT");
    if(token === '' || token === undefined || token === null)
    {
      dispatch(setAuth(false))
    }

    else 
    {
      dispatch(setAuth(true))
    }
  }

  useEffect(() => {
    setAuthentication()
    fetchBooksCategories();
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
        <Routes>
            <Route key='login' path='login' element={<Login/>} />
            <Route key='protected' element={<ProtectedRoutes/>}>
              <Route key="books" path="books" element={<Books/>}/>
              <Route key="authors" path="authors" element={<Authors/>}/>
              <Route key="book" path="/book/:id" element={<BookDetails/>} />
              <Route key="loans" path="loans" element={<Loans/>} />
              <Route key="home" path='*' element={Home} />
            </Route>
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
