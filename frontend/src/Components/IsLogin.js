import React from 'react'

const IsLogin = () => localStorage.getItem('refresh_token') === null || localStorage.getItem('access_token') === null ? false : true

export default IsLogin
