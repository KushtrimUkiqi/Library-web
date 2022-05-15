import React from 'react'

//components
import AddAuthor from './AddAuthor'
import AuthorItem from './AuthorItem'
import AuthorsTopBar from './AuthorsTopBar'
import Pagination from '../shared/Pagination/Pagination'

export default function AuthorsContainer({authors}) {
  return (
    <div>
        <AuthorsTopBar></AuthorsTopBar>
        <div className="container col-8" style={{padding: '3vh 0',height: '600px'}}>
        {authors.map((author,index) => <AuthorItem key={index} author={author}></AuthorItem>
        )}
        </div>
        {authors.length === 0 && (
        <div className="card">
            <div className="card-header">
                Error
            </div>
        <div className="card-body">
            <p className="card-text">Currently the list of authors is empty, please add new authors.</p>
            <a className="btn btn-primary">Add author</a>
        </div>
        </div>)
      }
      <AddAuthor></AddAuthor>
      <Pagination></Pagination>
    </div>
  )
}
