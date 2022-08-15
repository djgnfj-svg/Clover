import React, { useState , useEffect } from 'react'
import './DetailProfile.css'

function DetailProfile() {
  
  const [showDropdown  , setShowDropdown] = useState(false)
  const dropdownRef = React.createRef();

  useEffect(() => {
    if (showDropdown) document.addEventListener('click', handleClickOutSide)
    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  })

  const handleClickOutSide = (e) => {
    if (showDropdown && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }

  const handleClickDropdown = () => {
    if(showDropdown){
      setShowDropdown(false)
    }else if(!showDropdown){
      setShowDropdown(true)
    }
  }

  return (
    <div className='Detail_profile'>
      <div className='profile_img'>
        <img />
      </div>
      <div className='profile_clubinfo'>
        <div className='clubinfo_name'>클럽 명</div>
        <div className='clubinfo_description'>20자 이로 설명을 적어주세요 </div>
        <div className='clubinfo_edit'>
            <button>Edit Club</button>
            <button ref={dropdownRef} onClick={() => handleClickDropdown()}>•••</button>
        </div>
            {showDropdown && (
            <div className='clubinfo_dropdown'>
              <div>클럽 좋아요</div>
              <div>클럽 관리</div>
              <div>클럽 해체하기</div>
            </div>
            )}
      </div>
    </div>
  )
}

export default DetailProfile

