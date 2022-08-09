import React from 'react'
import './SearchClubPage.css'
import SearchForm from './Section/SearchForm/SearchForm'
import SearchResult from './Section/SearchResult/SearchResult'

function SearchClubPage() {
  return (
    <div className='Wrapper_Search'>
            <SearchForm />
            <SearchResult />
    </div>
  )
}

export default SearchClubPage
