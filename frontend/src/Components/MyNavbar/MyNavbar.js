import React, { useState } from 'react'
import './MyNavbar.css'

function MyNavbar() {

    const [showDropdown , setShowDropdown] = useState({
      home : true,
      club : false,
      test : false,

    })
    const {home , club , test} = showDropdown
    
    const handleClickCategory = (e) => {
      const { className } = e.target;

      const home = {
        ...showDropdown,
        home : true,
        club : false,
        test : false,
      }
      const club = {
        ...showDropdown,
        home : false,
        club : true,
        test : false,
      }
      const test = {
        ...showDropdown,
        home : false,
        club : false,
        test : true,
      }

      if(className === "NavHome"){
        setShowDropdown(home)
      }else if(className === "NavClub") {
        setShowDropdown(club)
      }else if(className === "NavTest"){
        setShowDropdown(test)
      }
    }

  return (
    <div className="MyNavbar">
      <div className= "Nav_title">Clover</div>
      
      <div className={home ? "selectCategory" : "NavCategoryHome"} >
        <span className="material-symbols-outlined">
          home
        </span>
        <p className='NavHome' onClick={(e) => handleClickCategory(e)}>Home</p>
     </div>

     <div className={club ? "selectCategory" : "NavCategoryClub" } >
      <span className="material-symbols-outlined" >
        diversity_3
        </span>
        <p className="NavClub" onClick={(e) => handleClickCategory(e)}>Club</p>
     </div>

     <div className={test ? "selectCategory" : "NavCategoryTest" }>
        <span className="material-symbols-outlined">
          favorite
        </span>
        <p className='NavTest' onClick={(e) => handleClickCategory(e)}>Test Clover</p>
     </div> 

    <div className="NavNotice">
     <span className="material-symbols-outlined">
      notifications_active
      </span>
    </div>

    <div className="NavProfile">
        <button className = "ProfileBtn">닉네임
         <button className = "ProfileDropdown"></button>
        </button>
        {/* {showDropdown && (
            <div>
                <div>회원 정보 수정</div>
                <div>설정</div>
                <div>로그아웃</div>
            </div>
            )} */}
    </div>

    </div>
  )
}


export default MyNavbar