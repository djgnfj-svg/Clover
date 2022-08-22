import React from 'react'
import './EditProfile.css'

function EditProfile() {
  return (
    <div>
      <div className='Profile_imgbox'>
        <input type='file' name='fileLabel' />
        <label htmlFor='fileLabel' />
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default EditProfile
