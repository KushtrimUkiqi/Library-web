import {Link} from 'react-router-dom';

//hooks
import {useEffect,useState} from 'react';

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../state/UserAuth';

//services
import HttpClientService from '../../../services/HttpClient';

export default function NavPaths({paths}) {

    const [booksCategory,setBooksCategory] = useState(["FANTASY","FICTIION"]);
    const dispatch = useDispatch()
    var authenticated = useSelector(state => state.auth.auth)

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

    function logOut() {
      localStorage.setItem("JWT",'');
      dispatch(setAuth(false))  
    }

    useEffect(() => {
      fetchBooksCategories();
    },[]);


  return (
    <>

      {
        authenticated ? 
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link to={'books'} className="nav-link">
            Books
            </Link>
            </li>
            <li className="nav-item">
            <Link to={'authors'} className="nav-link">
            Authors
            </Link>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                booksCategory.map((category,index) =>
                <li key={index}><a className="dropdown-item" href="#">{category}</a></li>
                )
                }
            </ul>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Countries</a>
            </li>
            <li>
              {authenticated ?
                  <button onClick={() => logOut()} style={{border: 'none'}} className='btn'>Log out</button> :
                <Link to={'login'} className='nav-link'>Log in</Link>}
            </li>
          </ul>
        : <></>

      }

    </>
  )
}
