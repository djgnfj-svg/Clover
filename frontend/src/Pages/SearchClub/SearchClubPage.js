import React, { useEffect, useState } from 'react'
import './SearchClubPage.css'
import SearchForm from './Section/SearchForm/SearchForm'
import SearchResult from './Section/SearchResult/SearchResult'

function SearchClubPage() {

  const [data , setData] = useState();

  const test = (boolean) => {
    setData(boolean)
  }

  useEffect(() => {
    test()
  },[test])

  return (
    <div className='Wrapper_Search'>
            <SearchForm test={test} />
            <SearchResult data={data} />
    </div>
  )
}

export default SearchClubPage
