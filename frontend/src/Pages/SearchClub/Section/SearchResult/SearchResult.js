import React, { useEffect, useState } from 'react'
import './SearchResult.css'
import axios from 'axios'
import { applyClub, clubDetail, clubList, getNewList, searchurl } from '../../../../Components/Apiurl'
import { useNavigate } from 'react-router-dom'

function SearchResult({data}) {

  const navigate = useNavigate("")

  const [clubData,setClubData] = useState("")

  useEffect(() => {
    setClubData(data)
  },[data])

  useEffect(() => {
    axios.get(searchurl,{
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(res => {
      setClubData(res.data)
    })
  },[])

  const handleApply = (id) => {
    navigate(`/club/${id}`)
  } 

  return (
    <div className='Wrapper_result'>
      <div className='Result_num'>
      </div>
      {clubData && clubData.map((item) => (
        <div className='Result_box'>
          <button onClick={(id) => handleApply(item.id)}>상세보기</button>
        <div className='club_image'>
            <img src={`${item.thumbnail}`} />
        </div>
        <div className='club_info'>
            <div className='Club_name'>{item.title} </div>
            <div className='Club_content'>주제 : {item.topic} </div>
            <div className='Club_content' >활동 시간 : 오후 7 ~ 12시 </div>
            <div className='Club_content' >활동 인원 : 3명 </div>
        </div>
        <div className='club_description'>
          {item.brief_introduction}
        </div>
      </div>
      ))}
    </div>
  )
}

export default SearchResult
