import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { passwordChnage } from '../../../../Components/Apiurl'
import './EditPassword.css'

function EditPassword() {

  const {id} = useParams()

  const [userInput , setUserInput] = useState({
    old_password : "",
    new_password1 : "",
    new_password2 : "",
  })

  const { old_password , new_password1 , new_password2} = userInput

  const handleChangeInput = (e) => {
    const {name , value} = e.target

    setUserInput({
      ...userInput,
      [name] : value
    })
  }

  const handleSubmitPassword = () => {
    axios.post(passwordChnage , userInput , 
    {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(res => {
      alert("비밀번호 변경에 성공했습니다 ! ")
    }).catch(error => {
      
    })
  }

  return (
    <div className='EditPassword'>
      <label >비밀번호 확인</label>
      <input type='password' value={old_password} name="old_password" onChange={handleChangeInput} />
      <label >변경할 비밀번호</label>
      <input type='password' value={new_password1} name="new_password1" onChange={handleChangeInput} />
      <input type='password' value={new_password2} name="new_password2" onChange={handleChangeInput} />
      <div className='submit_password'>
        <button onClick={() => handleSubmitPassword()}>확인</button>
      </div>
    </div>
  )
}

export default EditPassword
