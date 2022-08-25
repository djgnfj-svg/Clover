import React, { useState, useEffect } from 'react'
import './UserList.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CgCloseR } from "@react-icons/all-files/cg/CgCloseR";
import axios from 'axios';
import { userListurl } from '../../../../Components/Apiurl';

function UserList() {

    const { id } = useParams();

    const [userList, setUserList] = useState("")

    useEffect(() => {
        getUserList()
    }, [])

    const getUserList = () => {
        axios.get(userListurl(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            console.log(res.data)
            setUserList(res.data)
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div>
            <headers className="Edit_title">Clover</headers>
            {userList && (
                <>
                    <div className='Edit_inputForm'>
                        <input placeholder='유저 이름을 검색해 주세요 !' />
                        <span className="material-symbols-outlined">search</span> {/* 구글 아이콘  */}
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>핸드폰 번호</th>
                                    <th>역할</th>
                                    <th>죽일까요 마스터</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td>test@naver.cold</td>
                                        <td>010-4431-2231</td>
                                        <td>마스터</td>
                                        <td style={{ textAlign: "center", fontSize: "20px" }}><CgCloseR /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserList
