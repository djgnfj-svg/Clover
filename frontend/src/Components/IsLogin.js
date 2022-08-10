import React from 'react'

const IsLogin = () => !!localStorage.getItem('access_token')

export default IsLogin
