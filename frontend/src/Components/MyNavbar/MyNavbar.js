import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './MyNavbar.css'

function MyNavbar() {
  
    const url = window.location.pathname
    const page =  url.split("/")[1] 
    const navigate = useNavigate("")

    const pageurls = {
      home : "",
      club : "club",
      test : "clover"
    }

    const [selectPages , setSelectPages] = useState({
      home : true,
      club : false,
      test : false,

    })
    const {home , club , test} = selectPages

    useEffect(() => {
      const home = {
        ...selectPages,
        home : true,
        club : false,
        test : false,
      }
      const club = {
        ...selectPages,
        home : false,
        club : true,
        test : false,
      }
      const test = {
        ...selectPages,
        home : false,
        club : false,
        test : true,
      }

      if(page === pageurls.home){
        setSelectPages(home)
      }else if(page === pageurls.club) {
        setSelectPages(club)
      }else if(page === pageurls.test){
        setSelectPages(test)
      }

    },[url])
    
    const handleClickCategory = (e) => {
      const { className } = e.target

      if(className === "NavHome"){
        navigate("/" + pageurls.home)
      }else if(className === "NavClub") {
        navigate("/" + pageurls.club)
      }else if(className === "NavTest"){
        navigate("/" + pageurls.test)
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
        <p className='NavTest' onClick={(e) => handleClickCategory(e)}>Clover</p>
     </div> 

    <div className="NavNotice">
     <span className="material-symbols-outlined">
      notifications_active
      </span>
    </div>

    <div className="NavProfile">
        <button className = "ProfileBtn">
          <span>UserState</span>
          <span class="material-symbols-outlined">
              keyboard_arrow_down
            </span>
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