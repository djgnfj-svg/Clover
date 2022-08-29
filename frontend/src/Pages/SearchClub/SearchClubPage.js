import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { searchurl } from '../../Components/Apiurl';
import './SearchClubPage.css'
import SearchForm from './Section/SearchForm/SearchForm'
import SearchResult from './Section/SearchResult/SearchResult'

function SearchClubPage() {

  const [data , setData] = useState();
  const [test , setTest] = useState()

  const testing = (e) => {
      setData(e)
      console.log(e)
  }

  const getClubData = () => {
    axios.get(searchurl ,{
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(res => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getClubData()
  },[])

  return (
    <div className='Wrapper_Search'>
            <SearchForm test={testing} />
            <SearchResult data={data} />
    </div>
  )
}

export default SearchClubPage
