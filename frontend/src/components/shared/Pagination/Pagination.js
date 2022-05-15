import React from 'react';
import ReactPaginate from 'react-paginate';


import styleConfig from '../../../configurations/style';

import './Pagination.css';

export default function Pagination({paginationObj,pageCount = 0}) {
  return (
    <>
    <ReactPaginate
        previousLabel={"back"}
        previousClassName="btn mr-5 btn-secondary"
        nextLabel={"next"}
        nextClassName="btn ml-5 btn-secondary"
        activeClassName="active-page-pagination"
        activeLinkClassName="active"
        pageClassName="page-pagination"
        breakClassName='break-me'
        onPageChange={() => alert('hello page change')}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageLinkClassName="link"
        previousLinkClassName="link"
        nextLinkClassName="link"
        containerClassName={'pagination m-3 justify-content-center align-center'}/>

    </>
  )
}
