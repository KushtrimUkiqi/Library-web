import React from 'react';
import MiniLoading from '../Loading/MiniLoading';

// components
import SearchResult from './SearchResult';

export default function SearchResultContainer({searchResults,searchState,resultImage,loading,error}) {
  return (
    <span className="ds-dropdown-menu ds-with-1" role="listbox" id="algolia-autocomplete-listbox-0" 
    style={{boxShadow: '0px 0px 4px var(--main)',minWidth: '350px',backgroundColor: "white",position: "absolute", top: "115%", zIndex: 100,flexDirection: "column",right: "0px", display: searchState ? "flex" : "none"}}>
      {
          searchResults.map((value,index) => <SearchResult onClick={() => alert('hello')} key={index} result={{link: `book/${value.id}` ,text: value.text,subText:value.subText}} resultImage={resultImage}></SearchResult>)
      }
    {loading &&    
      <div className="center" style={{borderBottom: '1px solid gray'}}>
        <MiniLoading></MiniLoading>
      </div>}
    {error.error &&
      <div className="center" style={{fontSize: '14px',fontStyle: 'italic'}}>
      {error.message}
      </div>}

    </span>
  )
}
