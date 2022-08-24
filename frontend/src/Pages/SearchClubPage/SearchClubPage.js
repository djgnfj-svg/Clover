import React, { useEffect, useState } from 'react'
import './SearchClubPage.css'
import SearchForm from './Section/SearchForm/SearchForm'
import SearchResult from './Section/SearchResult/SearchResult'

function SearchClubPage() {

  const [isOpen , setIsOpen] = useState(false);

  const test = (boolean) => {
    setIsOpen(boolean)
  }

  return (
    <div className='Wrapper_Search'>
            <SearchForm test={test} />
            <SearchResult />
    </div>
  )
}

export default SearchClubPage
