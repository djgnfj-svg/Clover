import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './SignUp.css';



function SignUp() {

  const navigate = useNavigate();

  const signUrl = 'http://localhost:8000/api/accounts/'

  
  const [signForm , setSignForm] = useState({
    username : "",
    email : "",
    password1 : "",
    password2 : "",
  })
  
  const {username , email , password1 , password2 } = signForm
  
  const handleChangeInput = (e) => {
    const {name , value} = e.target;
    setSignForm({
      ...signForm,
      [name] : value
    })
  }

  const onClickSignUpBtn = () => {
    axios.post(signUrl,signForm)
    .then(res => {
      alert("회원가입 성공")
      navigate("/");
      localStorage.setItem('access_token' , res.data.access_token)
      localStorage.setItem('refresh_token' , res.data.refresh_token)
      console.log(res.data)
    })
    .catch(error => {
      alert(error)
    })
  }

  return (
    <div className="wrapper_SignUp">
      <div className="SignUP">
        <div className="SignUp_Title">
          Clover
        </div>
      </div>
      <div className="SignUp_Form">
        <label>이름</label>
        <input className="signup_inputname"
          onChange={handleChangeInput}
          placeholder="Name"
          type="name"
          name="username"
          value={username} />
          <label>이메일</label>
        <input className="signup_inputemail"
          onChange={handleChangeInput}
          placeholder="e-mail"
          name="email" 
          value={email}/>
          <label>비밀번호</label>
        <input className="signup_inputpassword"
          onChange={handleChangeInput}
          placeholder="Password"
          type="password"
          name="password1" 
          value={password1}/>
          <label>비밀번호 확인</label>
        <input className="signup_inputpassword_confirm"
          onChange={handleChangeInput}
          placeholder="Confrim Password"
          name="password2"
          type='password'
          value={password2} />
      </div>
      <div className="SignUp_btn">
        <button
        onClick={() => onClickSignUpBtn()}
        className="SignUp_text" 
        type="subit">
          가입하기
        </button>
      </div>
    </div>
  )
}

export default SignUp
