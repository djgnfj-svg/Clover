import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './SignUp.css';



function SignUp() {

  const navigate = useNavigate();

  const signUrl = 'http://localhost:8000/api/accounts/'


  const [signForm, setSignForm] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })
  const [error, setError] = useState()

  const { username, email, password1, password2 } = signForm

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSignForm({
      ...signForm,
      [name]: value
    })
  }

  const onClickSignUpBtn = () => {
    axios.post(signUrl, signForm)
      .then(res => {
        alert("회원가입 성공")
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        navigate("/");
      })
      .catch(error => {
        setError(error.response.data)
        alert("입력값이 잘못됐어요!")
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
          {error && error.username !== undefined && (
            <span>이미존재하는 이름입니다.</span>
          )}

          <label>이메일</label>
          <input className="signup_inputemail"
            onChange={handleChangeInput}
            placeholder="e-mail"
            name="email"
            value={email} />
             {error && error.email !== undefined && (
            <span>이메일이 중복됐거나 형식이 잘못됐습니다</span>
          )}

          <label>비밀번호</label>
          <input className="signup_inputpassword"
            onChange={handleChangeInput}
            placeholder="Password"
            type="password"
            name="password1"
            value={password1} />
             {error && error.password1 !== undefined && (
            <span>이메일과 비슷한단어가 포함됐거나 8글자 이상 영어와 숫자를 포함되지않앗습니다</span>
          )}

          <label>비밀번호 확인</label>
          <input className="signup_inputpassword_confirm"
            onChange={handleChangeInput}
            placeholder="Confrim Password"
            name="password2"
            type='password'
            value={password2} />
             {error && error.email !== undefined && (
            <span>위 패스워드와 동일한 패스워드를 입력해주세요.</span>
          )}

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
