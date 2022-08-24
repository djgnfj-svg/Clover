import React from 'react'
import './ClubSetting.css'

function ClubSetting() {
  return (
    <div className='Setting_Profile'>
      <div className='Profile_imgbox'>
        <input type='file' name='fileLabel' />
        <label htmlFor='fileLabel' />
      </div>
      <hr />
      <div className='Setting_Userinfo'>
        <div style={{fontSize:"30px"}}>유저이름</div>
        <div style={{fontSize:"26px" , color:"gray"}}>모임 주제를 입력해쥬세요</div>
        <div style={{fontSize:"23px" , marginTop:"30px"}}>유저의 소개를 20글자 내로 간단하게 설명해주세요</div>
      </div>
    </div>
  )
}

export default ClubSetting
