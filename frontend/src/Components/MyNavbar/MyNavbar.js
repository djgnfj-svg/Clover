import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Add_modal from './Add_Modal/Add_modal'
import IsLogin from '../IsLogin'
import './MyNavbar.css'
import axios from 'axios'
import { userInfoUrl } from '../Apiurl'

function MyNavbar() {

  const url = window.location.pathname
  const page = url.split("/")[1]
  const navigate = useNavigate("")

  const ref = useRef()

  const [isLogin, setIsLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [userInfo, setUserInfo] = useState({
    username: "",
    brief_introduction: "",
    thumbnail: "",
  })

  const pageurls = {
    home: "",
    club: "club",
    test: "clover"
  }

  const [selectPages, setSelectPages] = useState({
    home: true,
    club: false,
    test: false,

  })
  const { home, club, test } = selectPages;
  const { username, brief_introduction, thumbnail } = userInfo

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
    handleClickProfile()
    setIsOpen(false)
  },[])

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
    axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => {
        setUserInfo({
          ...userInfo,
          username: res.data[0].username,
          brief_introduction: res.data[0].description,
          thumbnail: res.data[0].image
        })
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })

    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const handleEditProfile = (e) => {
    e.preventDefault();
    navigate("/useredit")
  }

  const handleLogoutBtn = () => {
    const logout = window.confirm('정말 로그아웃 하시겟습니까?')
    if (!!logout) {
      localStorage.clear();
      setIsLogin(false)
      navigate("/login")
      setIsOpen(false)
    } else {
      alert("왜 에러야")
    }
  }

  return (
    <div className="MyNavbar">
      <div className="Nav_title" onClick={() => navigate("/")}>Clover</div>

      <div className={home ? "selectCategory" : "NavCategoryHome"} >
        <p className='NavHome' onClick={(e) => handleClickCategory(e)}>Home</p>
      </div>

      <div className={test ? "selectCategory" : "NavCategoryTest"}>
        <p className='NavTest' onClick={(e) => handleClickCategory(e)}>Club</p>
      </div>

      <div className={club ? "selectCategory" : "NavCategoryClub"} >
        <p className="NavClub" onClick={(e) => handleClickCategory(e)}>Search</p>
      </div>

      {/* {isLogin && (
        <div className="NavNotice">
        <span className="material-symbols-outlined">
        notifications_active
        </span>
        </div>
      )
} */}
      <div className="NavProfile">
        {isLogin && userInfo ? (
          <div>
            <button ref={ref} className="ProfileBtn" onClick={() => handleClickProfile()}>
              {thumbnail ? (
                <img src={thumbnail} className="material-symbols-outlined" style={{ width: "40px", height: "40px", borderRadius: "50%", position: "relative", objectFit: "cover", marginRight: "20px", fontSize: "30px" }} />
                )
                :
                (
                  <span className="material-symbols-outlined" style={{position:"relative" ,marginRight:"23px" , fontSize:"30px"}}>
                    account_circle
                  </span>
                )
              }
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
            {isOpen && (
              <div className='Profile_Dropdown'>
                <div className='Dropdown_profile'>
                {thumbnail ? (
                  <img src={thumbnail} />
                )
                :
                (
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                )
              }
                  <div className='Profile_name'>
                    <span style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>{userInfo.username}</span>
                    <span className='Profile_category'>{brief_introduction}</span>
                  </div>
                </div>
                <div className='Dropdown_AddClub' onClick={modalClose}>
                  <span class="material-symbols-outlined">
                    diversity_3
                  </span>
                  <span>모임 만들기</span>
                </div>
                <div className='Dropdown_settingProfile' onClick={(e) => handleEditProfile(e)}>
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
            <button onClick={() => navigate("/signup")}>회원가입</button>
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