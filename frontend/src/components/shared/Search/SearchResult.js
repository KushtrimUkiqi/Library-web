import React from 'react';
import { Link } from 'react-router-dom';

//style
import './Search.css'

//images
import bookImage from '../../../images/book.svg';



const SearchResult = ({result,resultImage}) => {
    return (
        <Link to={result.link} className="searchResultLink">
            <div style={{display: 'flex',alignItems: 'center',padding: '3px 0',borderBottom: '.3px solid gray'}}>
                {resultImage && <div style={{stroke: 'black'}}>
                    <img id="bookPath" src={resultImage} alt="book" />
                </div> }
                <div style={{paddingLeft: '5px'}}>
                    <div style={{fontSize: '18px',padding: '2px 4px'}}>{result.text}</div>
                    <div style={{fontSize: '10px',padding: '2px 4px'}}>{result.subText}</div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResult;
