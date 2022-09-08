import React from 'react'

const IsLogin = () => !!localStorage.getItem('access_token') === null ? false : true

export default IsLogin
