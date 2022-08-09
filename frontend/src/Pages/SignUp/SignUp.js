import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';



function SignUp() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  }

  const [Name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm,setPasswordconfirm] = useState("");

  const handleNameChange = (event) => {
    console.log("event.target.value", event.target.value);
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    console.log("event.target.value", event.target.value);
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    console.log("event.target.value", event.target.value);
    setPassword(event.target.value);
  }

  const handleChangePasswordConfirm = (event) => {
    console.log("event.target.value", event.target.value);
    setPasswordconfirm(event.target.value);
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
          onChange={handleNameChange}
          placeholder="Name"
          type="name"
          name="name"
          value={Name} />
          <label>이메일</label>
        <input className="signup_inputemail"
          onChange={handleEmailChange}
          placeholder="e-mail"
          type="email"
          name="email" 
          value={email}/>
          <label>비밀번호</label>
        <input className="signup_inputpassword"
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
          name="password" 
          value={password}/>
          <label>비밀번호 확인</label>
        <input className="signup_inputpassword_confirm"
          onChange={handleChangePasswordConfirm}
          placeholder="Confrim Password"
          type="password_confirm"
          name="password_confirm"
          value={passwordconfirm} />
      </div>
      <div className="SignUp_btn">
        <button
        onClick={() => onClick()}
        className="SignUp_text" 
        type="subit">
          가입하기
        </button>
      </div>
    </div>
  )
}

export default SignUp
