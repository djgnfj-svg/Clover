import React,{ useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {Modal , Button } from 'react-bootstrap'
import './Add_modal.css'
import { makeClubUrl } from '../../url';


function Add_modal({ show }) {

    const [fileUrl , setFileUrl] = useState()
    const [clubData , setClubData] = useState({
      title : "",
      topic : "",
      brief_introduction : "",
      thumbnail  : "",
    })
    const inputRef = React.createRef()
    const imageRef = useRef(null);

    const { title , brief_introduction , thumbnail , topic} = clubData

    const handleChangeInput = (e) => {
      const {name , value} = e.target;

      setClubData({
        ...clubData ,
        [name] : value
      })
    }

    // useEffect(() => {
    //   preview()

    //   return () => preview()
    // },[inputRef])
    
    const handleSubmit = () =>{
      alert(clubData)
        if(title.length  < 2 ){
          alert("제목을 2글자 이상 입력해주세요 !");
        }else if(brief_introduction.length < 5){
          alert("설명을 5글자 이내로 써주세요"); 
        }else{
          axios.post(makeClubUrl,
          clubData,
          {
            headers:{
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }   
          }
          ).then(res => {
            if(res.data.msg){
              alert("공백이 제목이 될 수 없어요 !")
            }else{
              show();
            }
          }).catch(error => {
            console.log(error)
            alert("실패")
          })
        }
        }
        
  
    const onUploadImage = useCallback((e) => {
      if (!e.target.files[0]) {
        return;
      }
      setClubData({
        ...clubData,
        thumbnail : e.target.files[0]
      })
    }, []);

    const onUploadImageButtonClick = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    }, [inputRef]);
    
    const preview = () => {
      if (!thumbnail) return false;

      const imgEl = document.querySelector('.img_box')

      const reader = new FileReader();

      reader.onload = () =>{
        (imgEl.style.backgroundImage = `url(${reader.result})`)
      }
        reader.readAsDataURL(thumbnail)
    }
    
      return (
      <>
        <Modal show={show} onHide={show} centered size='lg' style={{borderRadius:"0.3rem"}}>
          <Modal.Header closeButton style={{backgroundColor:"#31313c" , borderBottom:"1px solid #515163"}}>
            <Modal.Title style={{color:"#FEFEFE" , fontSize:"19px" , fontWeight:"400"}}>추가하기</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:"#31313c" , color:"#eaf7f9"}}>
            <div className='add_profile'>
              <img className='img_box'/>
            </div>
              <input type="file" id="upload" accept="image/*" ref={inputRef} onChange={onUploadImage} />
              <div className='add_title'>
                  <div className='title'>제목</div>
                  <input placeholder='제목을 입력해주세요' maxLength={10} value={title} name="title" onChange={handleChangeInput} />
              </div>
              <div className='add_title'>
                  <div className='title'>소모임 주제</div>
                  <input placeholder='소모임 주제를 입력해주세요' maxLength={10} value={topic} name="topic" onChange={handleChangeInput} />
              </div>
              <div className='add_description'>
                  <div className='brief_introduction'>설명</div>
                  <textarea placeholder='30자 이내 설명을 입력해주세요.' maxLength={33} style={{textAlign:"left"}} value={brief_introduction} name="brief_introduction" onChange={handleChangeInput} />
              </div>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"#31313c",border:"none"}}>
            <Button style={{ backgroundColor:"#31313c",height:"42px" ,border:"1px solid #515163" ,  width:"47%",position:"relative" , left:"-15px" , borderRadius:"0.3rem"}} onClick={show}>
              닫기
            </Button>
            <Button style={{width:"47%",height:"41px" ,  borderRadius:"0.3rem" , backgroundColor:"#00bba3" , border:"none"}} onClick={handleSubmit}>
              등록
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    }

export default Add_modal