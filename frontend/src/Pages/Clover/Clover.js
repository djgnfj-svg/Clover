import React from 'react'
import './Clover.css'

function Clover() {

  const handleApply = () => {

  }

  return (
    <div className='club_list'>

      <div className='my_clubList'>
        <h4>내 클럽</h4>
          <div className='Wrapper_club'>
            <div className='Result_num'>
            </div>
              <div className='Result_box'>
                <button onClick={(id) => handleApply()}>상세보기</button>
                <div className='club_image'>
                  {/* <img src={`${item.thumbnail}`} /> */}
                </div>
                <div className='club_info'>
                  <div className='Club_name'>title </div>
                  <div className='Club_content'>주제 : topic </div>
                  <div className='Club_content' >활동 시간 : 오후 7 ~ 12시 </div>
                  <div className='Club_content' >활동 인원 : 3명 </div>
                </div>
                <div className='club_description'>
                  {/* {item.brief_introduction} */}
                </div>
              </div>
          </div>
      </div>
      <div className='in_clubList'>
        <h4>가입한 클럽</h4>
        <div className='Wrapper_club'>
            <div className='Result_num'>
            </div>
              <div className='Result_box'>
                <button onClick={(id) => handleApply()}>상세보기</button>
                <div className='club_image'>
                  {/* <img src={`${item.thumbnail}`} /> */}
                </div>
                <div className='club_info'>
                  <div className='Club_name'>title </div>
                  <div className='Club_content'>주제 : topic </div>
                  <div className='Club_content' >활동 시간 : 오후 7 ~ 12시 </div>
                  <div className='Club_content' >활동 인원 : 3명 </div>
                </div>
                <div className='club_description'>
                  {/* {item.brief_introduction} */}
                </div>
              </div>
          </div>
      </div>

    </div>
  )
}

export default Clover
