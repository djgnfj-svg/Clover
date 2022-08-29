import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import './EditProfile.css'
import axios from 'axios'
import { clubDetail, userInfoUpdateUrl } from '../../../../Components/Apiurl';
import UserProfile from '../../UserProfile';

function EditProfile({ info }) {

  const { id } = useParams()
  const inputRef = useRef();

  const [description, setDescription] = useState(info.description)
  const [thumbnailUrl, setThumbnailUrl] = useState(info.image);

  const onUploadImage = useCallback((e) => {
    axios.put(userInfoUpdateUrl(info.id) , {
      image : e.target.files[0]
    },
    {
      headers : {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(res => {
      setThumbnailUrl(res.data.image)
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  },[])

  const onChangeInput = (e) => {
    setDescription(e.target.value)
  }

  const handleFinishBtn = () => {
    axios.put(userInfoUpdateUrl(info.id), {
      description,
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(res => {
        alert("변경 완료")
      })
  }



  return (

    <div className='userProfile_edit' style={{ display: "flex", flexDirection: "column" }}>
      <div className='Setting_Profile'>
        <div className='Profile_imgboxs'>
          <img className='img_boxs' name='thumbnail' src={thumbnailUrl} />
          <input type="file" id="upload" accept="image/*" ref={inputRef} onChange={onUploadImage} />
        </div>
        <hr />
        <div className='Setting_Userinfo'>
          <p type='readOnly' style={{ backgroundColor: "rgb(249,249,249)", fontWeight: "700", fontSize: "24px", border: "none", color: "black", marginBottom: "10px" }} placeholder='이름'>{info.username}</p>
          <div>자기 소개</div>
          <textarea style={{ fontSize: "17px", marginTop: "30px", height: "100px" }} onChange={onChangeInput} value={description} name="brief_introduction" placeholder='자기자신을 간단하게 20글자 내외로 입력해주세요'></textarea>
        </div>
      </div>
      <div className='setting_infobtn'>
        <button onClick={() => handleFinishBtn()}>완료</button>
      </div>
    </div>
  )
}

export default EditProfile
