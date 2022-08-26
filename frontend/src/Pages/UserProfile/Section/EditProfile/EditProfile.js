import React, { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import './EditProfile.css'
import axios from 'axios'
import { clubDetail } from '../../../../Components/Apiurl';

function EditProfile() {

  const {id} = useParams()
  const inputRef = useRef();

  const [userInput, setUserInput] = useState({
    topic: "",
    brief_introduction: "",
  })
  const [thumbnailUrl, setThumbnailUrl] = useState();

  const {topic, brief_introduction, thumbnail } = userInput

  const onUploadImage = useCallback((e) => {
    if (!e.target.files[0]) {
        alert("불러온 데이터 없음")
      return;
    }

    // axios.put(`${clubDetail}${id}/`,{
    //     thumbnail : e.target.files[0]
    // }, {
    //     headers : {
    //       "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //     }
    // })
    // .then(res => {
    //     setThumbnailUrl(res.data.thumbnail)
    // }).catch(error => {
    //     console.log(error)
    // })

  }, []);

  const onChangeInput = (e) => {
    const {name, value} = e.target
    setUserInput({
        ...userInput,
        [name] : value
    })
}

  return (

    <div className='userProfile_edit' style={{ display: "flex", flexDirection: "column" }}>
      <div className='Setting_Profile'>
        <div className='Profile_imgboxs'>
          <img className='img_boxs' name='thumbnail' style={{ backgroundImage: `url(${thumbnailUrl})` }} />
          <input type="file" id="upload" accept="image/*" ref={inputRef} onChange={onUploadImage} />
        </div>
        <hr />
        <div className='Setting_Userinfo'>
          <p type='readOnly' style={{ backgroundColor:"rgb(249,249,249)" ,fontWeight:"700" , fontSize: "24px", border: "none", color: "black", marginBottom: "10px" }} placeholder='이름'>이름</p>
          <div>자기 소개</div>
          <textarea style={{ fontSize: "17px", marginTop: "30px", height: "100px" }} onChange={onChangeInput} value={brief_introduction} name="brief_introduction" placeholder='자기자신을 간단하게 20글자 내외로 입력해주세요'></textarea>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
