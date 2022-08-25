import React, { useState, useEffect , useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './DetailProfile.css'
import axios from 'axios'
import { applyClub, ExitCluburl } from '../../../../Components/Apiurl';

function DetailProfile({profile }) {

  const dropdownRef = useRef()
  const dropdownUserRef = useRef()
  

  const navigate = useNavigate();
  const {id } = useParams()

  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownUser , setShowDropdownUser] = useState(false)
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    if (showDropdown) document.addEventListener('click', handleClickOutSide)
    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  })

  useEffect(() => {
    if (showDropdownUser) document.addEventListener('click', handleClickOutSideUser)
    return () => {
      document.removeEventListener('click', handleClickOutSideUser)
    }
  })

  const handleClickOutSide = (e) => {
    if (showDropdown && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }

  const handleClickOutSideUser = (e) => {
    if (showDropdownUser && !dropdownUserRef.current.contains(e.target)) {
      setShowDropdownUser(false)
    }
  }

  const handleClickDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false)
    } else if (!showDropdown) {
      setShowDropdown(true)
    }
  }
  const handleClickDropdownUser = () => {
    if (showDropdownUser) {
      setShowDropdownUser(false)
    } else if (!showDropdownUser) {
      setShowDropdownUser(true)
    }
  }

  const handleCheckApply = () => {
    let checkApply = window.confirm("가입 신청하시겠습니까?")

    if(checkApply){
      axios.post(applyClub,{
        clubid : id
      },
      {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => {
        console.log(res.data)
        alert(" 가입 신청 완료 !!")
      }).catch(error => {
        console.log(error)
      })
    }else if(!checkApply){

    }
  }

  const handleExitClub = () => {
    let checkApply = window.confirm("정말 탈퇴하시겟습니까?")

    if(checkApply){
      axios.post(ExitCluburl,{
        clubid : id
      },
      {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => {
        console.log(res.data)
        alert("길드를 탈퇴했습니다")
        navigate("/")
      }).catch(error => {
        console.log(error)
      })
    }else if(!checkApply){

    }
  }

  return (
    <div className='Detail_profile'>
        <div className='profile_img'>
        <img src={profile.thumbnail} />
      </div>
      <div className='profile_clubinfo'>
        <div className='clubinfo_name'>{profile.title}</div>
        <div>{profile.topic}</div>
        <div className='clubinfo_description'>{profile.brief_introduction} </div>
        {auth ? (
          <div className='clubinfo_edit'>
            <button onClick={() => navigate(`/club/${id}/edit`)}>Edit Club</button>
            <button ref={dropdownRef} onClick={() => handleClickDropdown()}>•••</button>
          </div>
        ) :
        // (
        //   <div className='clubinfo_edit'>
        //       <button onClick={() => handleCheckApply()}>가입 신청</button>
        //       <button ref={dropdownUserRef} onClick={() => handleClickDropdownUser()}>•••</button>
        //     </div>
        // )}
        (
          <div className='clubinfo_edit'>
              <button onClick={() => handleExitClub()}>탈톼하기</button>
              <button ref={dropdownUserRef} onClick={() => handleClickDropdownUser()}>•••</button>
            </div>
        )}
        {showDropdown && (
          <div className='clubinfo_dropdown'>
            <div>클럽 좋아요</div>
            <div>클럽 관리</div>
            <div>클럽 해체하기</div>
          </div>
        )}
        {showDropdownUser && (
          <div className='clubinfo_dropdown'>
            <div>문의 하기</div>
            <div>해체하기</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailProfile

