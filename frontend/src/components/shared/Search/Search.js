import React from 'react';

//hooks
import {useState} from 'react';


//components
import SearchInput from './SearchInput';
import SearchResultContainer from './SearchResultContainer';


// options : {
//   methods: {
//     httpRequest: MAKES THE REQUEST TO THE SERVER,
//     mapper: (responseObject) => ({responseObjectMapped}) // the mapper maps the object to {text,subText}
//   },
//   params: [{
//     page: ,
//     size: 
//   }],
//   placeholder: '',
//   resultImage: 
// }} 

export default function Search({options}) {

    const [searchState,setSearchState] = useState(false);
    const [searchResults,setSearchResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({error: false,message: ''});

    async function search(event)
    { 
      setError({error: false, message: ''});
      const searchQuery = event.target.value;
      if(searchQuery.length > 0){
        setLoading(true);
        setSearchState(true);
        options.methods.httpRequest(searchQuery,options.params.page,options.params.size)
          .then(resp => {

            if(resp.data.length === 0){
              setError({error: true, message: 'No results are available'});
              setSearchResults([]);
            }

            else {
              const arr = resp.data.map(options.methods.mapper);
              setSearchResults([...arr])
              console.log(arr)
            }

              setLoading(false);})
              
          .catch(err => {setLoading(true);
            console.log(err)
            setError({error: true,message: ''})})
      } 

      else if (searchQuery.length === 0){
        setSearchResults([]);
      }
    }


    function openSearch()
    {
      setSearchState(true);
    }

    function closeSearch()
    {
      
      setSearchState(false);
    }

  return (
    <form className="d-flex justify-content-end" style={{maxWidth: '400px'}}>
    <span
      className="algolia-autocomplete algolia-autocomplete-left" style={{position: "relative", display: "inline-block", direction: "ltr"}}>
        <div style={{position: 'relative'}}>
        <SearchInput
          onFocus={openSearch}
          onBlur={closeSearch}
          placeholder={options.placeholder}
          onKeyUp={search}
          >
        </SearchInput>
        </div>
        <SearchResultContainer 
          searchResults={searchResults} 
          searchState={searchState}
          resultImage={options.resultImage}
          loading={loading}
          error={error}> 
        </SearchResultContainer>
    </span>
  </form>
  )
}
