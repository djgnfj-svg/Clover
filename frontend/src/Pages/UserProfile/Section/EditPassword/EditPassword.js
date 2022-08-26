import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './EditPassword.css'

function EditPassword() {

  const {id} = useParams()

  const [userInput , setUserInput] = useState({
    nowPassword : "",
    chagePassword : "",
    confirmPassword : "",
  })

  const { nowPassword , changePassword , confirmPassword} = userInput

  const handleChangeInput = (e) => {
    const {name , value} = e.target

    setUserInput({
      ...userInput,
      [name] : value
    })
  }

  const handleSubmitPassword = () => {
    // axios.post('url' , userInput , 
    // {
    //   headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //   }
    // }).then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    // })
    alert('submit')
  }

  return (
    <div className='EditPassword'>
      <label >비밀번호 확인</label>
      <input value={nowPassword} name="nowPassword" onChange={handleChangeInput} />
      <label >변경할 비밀번호</label>
      <input value={changePassword} name="changePassword" onChange={handleChangeInput} />
      <input value={confirmPassword} name="confirmPassword" onChange={handleChangeInput} />
      <div className='submit_password'>
        <button onClick={() => handleSubmitPassword()}>확인</button>
      </div>
    </div>
  )
}

export default EditPassword
