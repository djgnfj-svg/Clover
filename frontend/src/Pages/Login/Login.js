import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();
  const loginUrl = ''

  const [loginForm  , setLoginForm] = useState({
    id : '',
    password  : ''
  })

  const {id , password} = loginForm

  const handleChangeInput = (e) => {
    const {name , value} = e.taget
    setLoginForm({
      ...loginForm,
      [name] : value
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
            name='id'
            onChange={handleChangeInput}
            value={id}
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
            <button className='login_btn'>Clover 로그인</button>
            <button className='sign_up'>회원가입</button>
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
