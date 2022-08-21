import React, { useEffect, useState } from 'react'
import './SearchResult.css'
import axios from 'axios'
import { applyClub, clubList } from '../../../../Components/url'

function SearchResult() {

  const [clubData,setClubData] = useState("")

  useEffect(() => {
    getSearchClubData();
  },[])

  const getSearchClubData = () => {
    axios.get(clubList ,
      {
        headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => {
        setClubData(res.data)
      })
  }

  const handleApply = (id) => {
    axios.post(applyClub ,{
      clubid : id
    },{
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      alert("성공")
    })
    .catch(error => {
      alert("실패")
    })
  }

  return (
    <div className='Wrapper_result'>
      <div className='Result_num'>
        <span>24 results</span>
      </div>
      {clubData && clubData.map((item) => (
        <div className='Result_box'>
          <button onClick={(id) => handleApply(item.id)}>상세보기</button>
        <div className='club_image'>
            <img src={`${process.env.PUBLIC_URL}/image/Clover.png`} />
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
