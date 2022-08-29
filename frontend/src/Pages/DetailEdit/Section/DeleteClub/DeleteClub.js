import React from 'react'
import './DeleteClub.css'

function DeleteClub() {
  return (
    <div className='DeleteClub'>
      <h2>정말 삭제하시겠습니까?</h2>
      <div>
        <button>네</button>
        <button>아니오</button>
      </div>
    </div>
  )
}

export default DeleteClub
