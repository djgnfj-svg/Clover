import React, { useState } from 'react'
import './InfoDetail.css'
import ReactMarkdown from 'react-markdown'

function InfoDetail() {

  const [description , setDescription] = useState("")

  return (
    <>
      <ReactMarkdown children={description} />
    </>
  )
}

export default InfoDetail
