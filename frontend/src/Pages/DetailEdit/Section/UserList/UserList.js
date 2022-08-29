import React, { useState, useEffect } from 'react'
import './UserList.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CgCloseR } from "@react-icons/all-files/cg/CgCloseR";
import axios from 'axios';
import { userListurl, userOutUrl } from '../../../../Components/Apiurl';

function UserList({ searchBoolean }) {

    const { id } = useParams();

    const [master, setMaster] = useState("")
    const [manangerList, setManagerList] = useState("")
    const [userList, setUserList] = useState("")

    useEffect(() => {
        getUserList()
    }, [searchBoolean])

    const getUserList = () => {
        axios.get(userListurl(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setMaster(res.data.master)
            setManagerList(res.data.manangerlist)
            setUserList(res.data.user_list)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleOutMyClub = (outid) => {
        axios.delete(userOutUrl(id)+`?user_id=${outid}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            alert("나가")
            getUserList();
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
                                    <th>소개</th>
                                    <th>역할</th>
                                    <th>죽일까요 마스터</th>
                                </tr>
                            </thead>
                            <tbody>
                                {master && (
                                    <tr>
                                        <td>{master.username}</td>
                                        <td>{master.user_instroduction}</td>
                                        <td>마스터</td>
                                    </tr>
                                )}
                                {manangerList && manangerList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td>{item.user_instroduction}</td>
                                        <td>운영진</td>
                                        <td onClick={() => handleOutMyClub(item.id)} style={{ textAlign: "center", fontSize: "20px", paddingLeft: "0vw" }}><CgCloseR /></td>
                                    </tr>
                                ))}
                                {userList && userList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td>{item.user_instroduction}</td>
                                        <td>유저</td>
                                        <td onClick={() => handleOutMyClub(item.id)} style={{ textAlign: "center", fontSize: "20px", paddingLeft: "0vw" }}><CgCloseR /></td>
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
