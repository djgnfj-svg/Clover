import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Add_modal from './Add_Modal/Add_modal'
import IsLogin from '../IsLogin'
import './MyNavbar.css'

function MyNavbar() {

  const url = window.location.pathname
  const page = url.split("/")[1]
  const navigate = useNavigate("")
  
  const ref = useRef()

  const [isLogin, setIsLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showModal , setShowModal] = useState(false)

  const pageurls = {
    home: "",
    club: "club",
    test: "club/clubdetail"
  }

  const [selectPages, setSelectPages] = useState({
    home: true,
    club: false,
    test: false,

  })
  const { home, club, test } = selectPages;

  useEffect(() => {
    if (!!IsLogin()) {
      setIsLogin(true)
    } else if (!IsLogin()) {
      setIsLogin(false)
    }
  }, [localStorage.getItem('access_token')])

  useEffect(() => {
    const home = {
      ...selectPages,
      home: true,
      club: false,
      test: false,
    }
    const club = {
      ...selectPages,
      home: false,
      club: true,
      test: false,
    }
    const test = {
      ...selectPages,
      home: false,
      club: false,
      test: true,
    }

    if (page === pageurls.home) {
      setSelectPages(home)
    } else if (page === pageurls.club) {
      setSelectPages(club)
    } else if (page === pageurls.test) {
      setSelectPages(test)
    }

  }, [url])

  useEffect(() => {
    if (isOpen) document.addEventListener('click', handleClickOutSide)
    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  })

  const handleClickOutSide = (e) => {
    if (isOpen && !ref.current.contains(e.target)) {
      setIsOpen(false)
    }
  }
  const modalClose = () => {
    setShowModal(!showModal)
}

  const handleClickCategory = (e) => {
    const { className } = e.target

    if (className === "NavHome") {
      navigate("/" + pageurls.home)
    } else if (className === "NavClub") {
      navigate("/" + pageurls.club)
    } else if (className === "NavTest") {
      navigate("/" + pageurls.test)
    }
  }

  const handleClickProfile = () => {
    if(!isOpen){
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  }
 
  const handleLogoutBtn = () => {
    const logout =  window.confirm('정말 로그아웃 하시겟습니까?')
    if(!!logout){
      localStorage.clear();
      setIsLogin(false)
      navigate("/login")
      setIsOpen(false)
    }else{
      alert("왜 에러야")
    }
  }

  return (
    <div className="MyNavbar">
      <div className="Nav_title"><img src={`${process.env.PUBLIC_URL}/image/`} /></div>

      <div className={home ? "selectCategory" : "NavCategoryHome"} >
        <span className="material-symbols-outlined">
          home
        </span>
        <p className='NavHome' onClick={(e) => handleClickCategory(e)}>Home</p>
      </div>

      <div className={club ? "selectCategory" : "NavCategoryClub"} >
        <span className="material-symbols-outlined" >
          diversity_3
        </span>
        <p className="NavClub" onClick={(e) => handleClickCategory(e)}>Club</p>
      </div>

      <div className={test ? "selectCategory" : "NavCategoryTest"}>
        <p className='NavTest' onClick={(e) => handleClickCategory(e)}>Clover</p>
      </div>
      {isLogin && (
        <div className="NavNotice">
        <span className="material-symbols-outlined">
        notifications_active
        </span>
        </div>
      )
}

      <div className="NavProfile">
        {isLogin ? (
          <div>
            <button ref={ref} className="ProfileBtn" onClick={() => handleClickProfile()}>
            <span className="material-symbols-outlined" style={{position:"relative" ,marginRight:"20px" , fontSize:"30px"}}>
                    account_circle
                  </span>
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
            {isOpen && (
              <div className='Profile_Dropdown'>
                <div className='Dropdown_profile'>
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  <div className='Profile_name'>
                    <span style={{fontWeight :"bold" , color:"black" , fontSize:"18px"}}>김밥님</span>
                    <span className='Profile_category'>안녕하세요 반가워요 !</span>
                  </div>
                </div>
                <div onClick={modalClose}>
                <span class="material-symbols-outlined">
                  diversity_3
                </span>
                  <span>모임 만들기</span>
                </div>
                <div>
                <span class="material-symbols-outlined">
                    thumb_up_off
                  </span>
                  <span>코드 리팩토링</span>
                </div>
                <div>
                <span class="material-symbols-outlined">
                    settings
                  </span>
                  <span>프로필 수정</span>
                </div>
                  <hr className='line'></hr>
                <div onClick={(e) => handleLogoutBtn(e)} className='Dropdown_Logout'>
                  <span className="material-symbols-outlined">
                    lock_open
                  </span>
                  <span>로그아웃</span>
                </div>
              </div>
            )}
          </div>
        )
          :
          <div className='Nav_Login'>
            <button onClick={() => navigate("/login")}>로그인</button>
          </div>
        }
        {showModal && <Add_modal show={modalClose} />}
      </div>
    </div>
  )
}


export default MyNavbar
{/* {showDropdown && (
    <div>
        <div>회원 정보 수정</div>
        <div>설정</div>
        <div>로그아웃</div>
    </div>
    )} */}

{/* {isOpen && (
              <div className='Profile_Dropdown'>
                <div>
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  <span>My Profile</span>
                </div>

                <div>
                <span class="material-symbols-outlined">
                  diversity_3
                </span>
                  <span>My Club</span>
                </div><div>
                <span class="material-symbols-outlined">
                    thumb_up_off
                  </span>
                  <span>My Clover</span>
                </div>

                <div onClick={() => localStorage.clear()}>
                  <span className="material-symbols-outlined">
                    logout
                  </span>
                  <span>Logout</span>
                </div>

              </div>
            )} */}