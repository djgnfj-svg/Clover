import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NoneUser() {

    const navigate = useNavigate()

    useEffect(() => {
        alert("로그인 후 사용해주세요")
        navigate("/login")
    },[])

  return (
    <div>
      
    </div>
  )
}

export default NoneUser
