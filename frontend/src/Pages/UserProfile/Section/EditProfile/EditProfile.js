import React from 'react'
import './EditProfile.css'

function EditProfile() {
  return (
    <div className='EditProfile'>
      <div className='Profile_imgbox'>
        <input type='file' name='fileLabel' />
        <label htmlFor='fileLabel' />
      </div>
      <div className='Edit_userinfo'>
        <div style={{fontSize:"30px"}}>유저이름</div>
        <div style={{fontSize:"23px" , marginTop:"30px"}}>유저의 소개를 20글자 내로 간단하게 설명해주세요</div>
      </div>
    </div>
  )
}

export default EditProfile
