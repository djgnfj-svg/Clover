import React, { useEffect, useState } from 'react'
import './Clover.css'
import axios from 'axios'
import { userInfoUrl } from '../../Components/Apiurl'
import { useNavigate } from 'react-router-dom';

//affiliated_club 
//my_club

function Clover() {

  const navigate = useNavigate();

  const [applyList, setApplyList] = useState()
  const [myClub, setMyClub] = useState()

  useEffect(() => {
    getClubList()
  }, [])

  const getClubList = () => {
    axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => {
        setApplyList(res.data[0].affiliated_club)
        setMyClub(res.data[0].my_club)
      }).catch(error => {
        console.log(error)
      })
  }

  const handleApply = (clubid) => {
    navigate(`/club/${clubid}`)
  }


  return (
    <div className='club_list'>

      <div className='my_clubList'>
        <h4>내 클럽</h4>
        <div className='Wrapper_club'>
          <div className='Result_num'>
          </div>
          {myClub && myClub.map((item) => (
            <div className='Result_box'>
              <button onClick={(id) => handleApply(item.id)}>상세보기</button>
              <div className='club_image'>
                <img src={`${item.thumbnail}`} />
              </div>
              <div className='club_info'>
                <div className='Club_name'>{item.title}</div>
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
      </div>
      <div className='in_clubList'>
        <h4>가입한 클럽</h4>
        <div className='Wrapper_club'>
          <div className='Result_num'>
          </div>
          {applyList && applyList.map((item) => (
            <div className='Result_box'>
              <button onClick={(id) => handleApply(item.id)}>상세보기</button>
              <div className='club_image'>
                <img src={`${item.thumbnail}`} />
              </div>
              <div className='club_info'>
                <div className='Club_name'>{item.title}</div>
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
      </div>

    </div>
  )
}

export default Clover
