import React, { useState, useEffect } from 'react'
import './ClubInfo.css'
import axios from 'axios'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { useNavigate } from 'react-router-dom';

function ClubInfo() {

    const textRef = React.createRef();
    const navigate = useNavigate("")

    const [description, setDescription] = useState("")

    const handleChangeInput = () => {
        setDescription(textRef.current.getInstance().getHTML())
    }
    
    const handleSubmitPost = () => {
        alert("수정 완료 !")
    }

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
                        // await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`, {
                        //     image: blob,
                        //     title: "aa",
                        // },
                        //     {
                        //         headers: {
                        //             "Content-Type": "multipart/form-data",
                        //             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        //         },
                        //     }).then(res => {
                        //         setIds(ids.concat(res.data.id))
                        //         callback(res.data.image, "alt text");
                        //     })
                        callback('http://localhost:5000/img/카레유.png', '카레유');
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
                initialValue={description}
                previewStyle="vertical"
                height="840px" // mac = 800 //desctop  = 905
                autofocus={true}
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={handleChangeInput}
                toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
            />
            <div className='Write_addBtn' style={{ marginRight: "30px" }}>
                <button onClick={(e) => handleSubmitPost(e)}>추가하기</button>
            </div>
        </div>
    )
}

export default ClubInfo
