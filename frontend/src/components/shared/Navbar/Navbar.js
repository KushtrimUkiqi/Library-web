import {Link} from 'react-router-dom';

//images
import image from '../../../images/book.svg'
import navBarLogo from '../../../images/NavBarLogo.svg'

//services
import HttpClientService from '../../../services/HttpClient';

//components
import Search from '../Search/Search';
import NavPaths from './NavPaths';

//state
import { useSelector } from 'react-redux';

function Nav(){

    const auth = useSelector((state) => state.auth.auth)

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={''}>
            <img src={navBarLogo} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavPaths></NavPaths>
          {
            auth ? <Search 
            options={{
                methods: {
                  httpRequest: HttpClientService.searchBooks,
                  mapper: (book) => ({id: book.id ,text: book.name, subText: book.author})
                },
                params: [{
                  page: 0,
                  size: 5
                }],
                placeholder: 'Search',
                resultImage: image
              }}>
            </Search>
              : <></>
          }
          
        </div>
      </div>
    </nav>
    );
} 

export default Nav;
