import React, { useState, useEffect , useRef } from 'react'
import './ClubInfo.css'
import axios from 'axios'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { useNavigate, useParams } from 'react-router-dom';
import { clubDetail, clubinfoImgUrl } from '../../../../Components/Apiurl';


function ClubInfo({file}) {

    const {id} = useParams();

    const textRef = useRef()
    const navigate = useNavigate("")
    
    const [description, setDescription] = useState("")
    
    const handleChangeInput = () => {
        setDescription(textRef.current.getInstance().getHTML())
    }
    
    const handleSubmitPost = () => {
        axios.put(clubDetail+`${id}/`,{
            description
        } , 
        {
            headers : {
                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(res => {
            alert("수정 완료 !")
        })
    }

    useEffect(() => {
        setDescription(file.description)
    },[])

    useEffect(() => {
        if (textRef.current) {
            textRef.current.getInstance().removeHook("addImageBlobHook");
            textRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                        /**
                         * 이미지 받아오는 함수를 실행합니다.
                         * blob 은 해당 이미지 파일이에요. 이 파일을 서버로 보내면 돼요.
                         * 받아온 이미지 주소를 callback 에 인수로 넣고, 두 번째 인수로는 alt 텍스트를 넣을 수 있어요. 아래의 모드는 예시입니다.
                         */
                        await axios.post(clubinfoImgUrl(id), {
                            image: blob,
                        },
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                },
                            }).then(res => {
                                console.log(res.data)
                                callback(res.data.image, "alt text");
                            })
                    })();

                    return false;
                });
        }

        return () => { };
    }, [textRef]);

    return (
        <div className='heelow'>
            <Editor
                ref={textRef}
                initialValue={file.description}
                previewStyle="vertical"
                height="840px" // mac = 800 //desctop  = 905
                autofocus={true}
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={handleChangeInput}
                toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
            />
            <div className='Write_addBtn' style={{ marginRight: "30px" }}>
                <button onClick={(e) => handleSubmitPost(e)}>수정하기</button>
            </div>
        </div>
    )
}

export default ClubInfo
