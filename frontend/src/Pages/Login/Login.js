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
  const handleEnterPress = (e) => {
    if(e.key === 'Enter'){
      handleClickLogin()
    }
  }

  const handleClickLogin = (e) => {
    e.preventDefault();
    axios.post(loginUrl,loginForm)
    .then(res => {
      localStorage.setItem('access_token' , res.data.access_token)
      localStorage.setItem('refresh_token' , res.data.refresh_token)
      alert("로그인 성공")
      navigate("/")
    })
    .catch(error => {
      alert("이메일 또는 비밀번호가 잘못됐습니다.")
      console.log(error)
    })
  }
  

  return (
    <>
		<main className="login_main">
			<form class="form_class" style={{backgroundColor:"white"}}>
				<div className="form_div">
					<div className="social_login">
						<div className="social_google">
							<img src={`${process.env.PUBLIC_URL}/image/btn_google.png`} />
							<span>Google로 진행하기</span>
						</div>
						<div className="social_naver">
							<img src={`${process.env.PUBLIC_URL}/image/btn_naver.png`} />
							<span>Naver로 진행하기</span>
						</div>
					</div>
					<hr />
					<label>이메일:</label>
					<input name='email' className="field_class" type="text" placeholder="이메일주소를 입력하세요" onKeyDown={(e) => handleEnterPress(e)} onChange={handleChangeInput} value={email} />
					<label>비밀번호:</label>
					<input name="password" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onKeyDown={(e) => handleEnterPress(e)} onChange={handleChangeInput} value={password} />
					<button className="submit_class" style={{backgroundColor:"2a9f5c"}} onClick={(e) => handleClickLogin(e)}>로그인</button>
				</div>
				<div className="info_div">
					<p>Clover가 처음이신가요?</p>
					<a href='#' onClick={() => navigate("/signup")}>가입하기</a>
				</div>
			</form>
		</main>
		</>
  )
}

export default Login
