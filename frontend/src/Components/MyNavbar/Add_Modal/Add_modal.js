import React,{ useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {Modal , Button } from 'react-bootstrap'
import './Add_modal.css'


function Add_modal({ show }) {

    const [fileUrl , setFileUrl] = useState()
    const [clubData , setClubData] = useState({
      title : "",
      description : "",
      imgUrl  : "",
      topic : ""
    })
    const inputRef = useRef(null);

    const { title , description , imgUrl , topic} = clubData

    const handleChangeInput = (e) => {
      const {name , value} = e.target;

      setClubData({
        ...clubData ,
        [name] : value
      })
    }

    useEffect(() => {
      preview()

      return () => preview()
    })

    
    const handleSubmit = () =>{
        if(title.length  < 2 ){
          alert("제목을 2글자 이상 입력해주세요 !");
        }else if(description.length < 5){
          alert("설명을 5글자 이내로 써주세요"); 
        }else{
          axios.post("http://127.0.0.1:8000/api/books/",
          {
            clubData
          },
          {
            headers:{
              Authorization : `Bearer ${localStorage.getItem('access_token')}`
            }   
          }).then(res => {
            if(res.data.msg){
              alert("공백이 제목이 될 수 없어요 !")
            }else{
              show();
            }
          }).catch(error => {
            console.log(error)
          })
        }
        }
        
  
    const onUploadImage = useCallback((e) => {
      if (!e.target.files[0]) {
        return;
      }
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      setClubData({
        ...clubData,
        imgUrl : e.target.files[0]
      })

      // axios.post('url' ,formData ,
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

    }, []);

    const onUploadImageButtonClick = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    }, []);
    
    const preview = () => {
      if (!imgUrl) return false;

      const imgEl = document.querySelector('.img_box')

      const reader = new FileReader();

      reader.onload = () =>{
        (imgEl.style.backgroundImage = `url(${reader.result})`)
      }
        reader.readAsDataURL(imgUrl)
    }
    
    // const changeconvertBase64IntoFile  = (image, fileName) =>  {
    //   const mimeType = image?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]   // image/jpeg
    //   const realData = image.split(',')[1]   // 이 경우에선 /9j/4AAQSkZJRgABAQAAAQABAAD...
    
    //   const blob = b64toBlob(realData, mimeType)
    //   const raw = new File([blob], fileName, { type: mimeType })
    
    //   const fileList = [{ name: raw.name, size: raw.size, uid: 1, raw }]
    //   setFileUrl(raw.name)
    // }

    // const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    //   if (b64Data === '' || b64Data === undefined) return
    
    //   const byteCharacters = atob(b64Data)
    //   const byteArrays = []
    
    //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //     const slice = byteCharacters.slice(offset, offset + sliceSize)
    //     const byteNumbers = new Array(slice.length)
    //     for (let i = 0; i < slice.length; i++) {
    //       byteNumbers[i] = slice.charCodeAt(i)
    //     }
    //     const byteArray = new Uint8Array(byteNumbers)
    //     byteArrays.push(byteArray)
    //   }
    // }
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
                  <input placeholder='제목을 입력해주세요' maxLength={10} value={title} name={title} onChange={handleChangeInput} />
              </div>
              <div className='add_title'>
                  <div className='title'>소모임 주제</div>
                  <input placeholder='소모임 주제를 입력해주세요' maxLength={10} value={topic} name={topic} onChange={handleChangeInput} />
              </div>
              <div className='add_description'>
                  <div className='description'>설명</div>
                  <textarea placeholder='30자 이내 설명을 입력해주세요.' maxLength={33} style={{textAlign:"left"}} value={description} name={description} onChange={handleChangeInput} />
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