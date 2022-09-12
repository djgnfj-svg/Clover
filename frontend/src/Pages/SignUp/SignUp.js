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

  const onClickSignUpBtn = (e) => {
    e.preventDefault()
    if(password1.length < 6){
      alert("6글자 이상 숫자와 영문이 포함된 비밀번호를 입력해주세요")
    }else if(password1 !== password2){
      alert("두 비밀번호가 다릅니다.")
    }else {
      axios.post(signUrl, signForm)
      .then(res => {
        alert("회원가입 성공")
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        navigate("/");
      })
      .catch(error => {
        setError(error)
        alert("이미 존재하는 이메일입니다.")
      })
    }
  }

  return (
    <main className="sign_up_main">
      <form className="form_class">
        <div className='sign_title'>가입하기</div>
        <div className="form_div">
          <label>닉네임</label>
          <input className="field_class" type="text" placeholder="닉네임을 입력하세요" autoFocus onChange={handleChangeInput} name='username' value={username} maxLength="10" />
          <label>이메일</label>
          <input name='email' className="field_class" type="text" placeholder="이메일주소를 입력하세요" onChange={handleChangeInput}  value={email} />
          <label>비밀번호</label>
          <input name="password1" id="pass"  className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={handleChangeInput} value={password1} />
          <label>비밀번호 확인</label>
          <input name="password2" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={handleChangeInput} value={password2} />
          <button className="submit_class" onClick={(e) => onClickSignUpBtn(e)}>회원가입</button>
        </div>
        <div className="info_div">
          <p>이미회원이라면 <a href="#" onClick={() => navigate("/login")}>로그인</a></p>
        </div>
      </form>
    </main>
  )
}

export default SignUp
