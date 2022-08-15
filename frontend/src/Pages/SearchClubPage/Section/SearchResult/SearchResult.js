import React from 'react'
import './SearchResult.css'

function SearchResult() {
  return (
    <div className='Wrapper_result'>
      <div className='Result_num'>
        <span>24 results</span>
      </div>
      <div className='Result_box'>
          <span className="material-symbols-outlined">
            grade
            </span>
        <div className='club_image'>
            <img src={`${process.env.PUBLIC_URL}/image/Clover.png`} />
        </div>
        <div className='club_info'>
            <div className='Club_name'>Club 이름 </div>
            <div className='Club_content'>주제 : 프로그래밍 </div>
            <div className='Club_content' >활동 시간 : 오후 7 ~ 2시 </div>
            <div className='Club_content' >활동 인원 : 3명 </div>
        </div>
        <div className='club_description'>
           우리 모임은 뼈대있는 모임이며 롤 개좋아함 당장 달려오셈ㄱ <br /> 발로 골드 미만 신청금지
        </div>
      </div>
      <div className='Result_box'>
        
      </div>
      <div className='Result_box'>
        
      </div>
      <div className='Result_box'>
        
      </div>
    </div>
  )
}

export default SearchResult
