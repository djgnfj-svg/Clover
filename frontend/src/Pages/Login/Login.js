import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();
  const loginUrl =  'http://localhost:8000/api/accounts/login/'

  const [loginForm  , setLoginForm] = useState({
    email : "",
    password  : ""
  })

  const {email , password} = loginForm

  const handleChangeInput = (e) => {
    const {name , value} = e.target
    setLoginForm({
      ...loginForm,
      [name] : value
    })
  }
  const handleClickLogin = () => {
    axios.post(loginUrl,loginForm)
    .then(res => {
      localStorage.setItem('access_token' , res.data.access_token)
      localStorage.setItem('refresh_token' , res.data.refresh_token)
      navigate("/")
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return (
    <div className='Wrapper_Login'>
      <div className='Login'>
        <div className='Login_Title'>
          Clover
        </div>
        <div className='Login_Form'>
          <input className='Id'
            name='email'
            onChange={handleChangeInput}
            value={email}
          />
          <input className='Password'
            name='password'
            type='password'
            onChange={handleChangeInput}
            value={password}
            />
        </div>
          <div className='Login_Status'>
          <span class="material-symbols-outlined">
            check_box
          </span>
          <span className='Login_statustext'>
            로그인 상태유지
          </span>
          </div>
          <div className='Clover_login'>
            <button className='login_btn' onClick={() => handleClickLogin()}>Clover 로그인</button>
            <button className='sign_up' onClick={() => navigate("/signup")}>회원가입</button>
            <button className='find_id'>아이디찾기</button>
            <button className='find_password'>비밀번호 찾기</button>
          </div>
          <div className='social_login'>
            <button className='social_google'>Google 로그인</button>
            <button className='social_naver'>Naver 로그인</button>
          </div>
      </div>
    </div>
  )
}

export default Login
