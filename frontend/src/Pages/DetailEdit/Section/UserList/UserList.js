import React, { useState, useEffect, useRef } from 'react'
import './UserList.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CgCloseR } from "@react-icons/all-files/cg/CgCloseR";
import axios from 'axios';
import { clubRankUrl, userListurl, userOutUrl } from '../../../../Components/Apiurl';
import {FaRegArrowAltCircleDown} from '@react-icons/all-files/fa/FaRegArrowAltCircleDown'

function UserList({ searchBoolean }) {

    const { id } = useParams();
    const dropdownRef = useRef()
    const dropdownUserRef = useRef()

    const [master, setMaster] = useState("")
    const [manangerList, setManagerList] = useState("")
    const [userList, setUserList] = useState("")

    const [managerDropdown , setManagerDropdown] = useState(false)
    const [userDropdown , setUserDropdown] = useState(false)

    useEffect(() => {
        getUserList()
    }, [searchBoolean])

    // useEffect(() => {
    //     if (managerDropdown) document.addEventListener('click', handleClickOutSide)
    //     return () => {
    //       document.removeEventListener('click', handleClickOutSide)
    //     }
    //   })
    
    //   useEffect(() => {
    //     if (userDropdown) document.addEventListener('click', handleClickOutSideUser)
    //     return () => {
    //       document.removeEventListener('click', handleClickOutSideUser)
    //     }
    //   })
    
    //   const handleClickOutSide = (e) => {
    //     if (managerDropdown && !dropdownRef.current.contains(e.target)) {
    //       setManagerDropdown(false)
    //     }
    //   }
    
    //   const handleClickOutSideUser = (e) => {
    //     if (userDropdown && !dropdownUserRef.current.contains(e.target)) {
    //       setUserDropdown(false)
    //     }
    //   }
    
    //   const handleClickDropdown = () => {
    //     if (managerDropdown) {
    //       setManagerDropdown(false)
    //     } else if (!managerDropdown) {
    //       setManagerDropdown(true)
    //     }
    //   }
    //   const handleClickDropdownUser = () => {
    //     if (userDropdown) {
    //       setUserDropdown(false)
    //     } else if (!userDropdown) {
    //       setUserDropdown(true)
    //     }
    //   }

    const getUserList = () => {
        axios.get(userListurl(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setMaster(res.data.master)
            setManagerList(res.data.manager_list)
            setUserList(res.data.user_list)
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const managerDownUser = (ids) => {
        axios.delete(clubRankUrl(id)+`?manager_id=${ids}`,
        {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            alert("떨어뜨려 !")
            getUserList()
        })
    }

    const userUpManager = (ids) => {
            axios.post(clubRankUrl(id) , {
                user_id : ids
            },
            {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                alert("올려 !")
                getUserList()
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
                                        <td>운영진 <button onClick={() => managerDownUser(item.id)}>유저로 강등</button>
                                            {/* {master &&
                                                (<span ref={dropdownRef} onClick={() => handleClickDropdown()} > <FaRegArrowAltCircleDown /></span>)} */}
                                         </td> 
                                        <td onClick={() => handleOutMyClub(item.id)} style={{ textAlign: "center", fontSize: "20px", paddingLeft: "0vw" }}><CgCloseR /></td>
                                    </tr>
                                ))}
                                {userList && userList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td>{item.user_instroduction}</td>
                                        <td>유저<button onClick={() => userUpManager(item.id)}>운영진 승급</button></td>
                                        {/* <td>유저{master &&
                                                (<span ref={dropdownUserRef} onClick={() => handleClickDropdownUser()} > <FaRegArrowAltCircleDown /></span>)}</td> */}
                                        <td onClick={() => handleOutMyClub(item.id)} style={{ textAlign: "center", fontSize: "20px", paddingLeft: "0vw" }}><CgCloseR /></td>
                                    </tr>
                                ))}
                                {/* {managerDropdown && (
                                    <div className='editUserRank'>
                                        <div>유저로 강등</div>
                                    </div>
                                )}
                                  {userDropdown && (
                                    <div className='editUserRank'>
                                        <div>운영진 승급</div>
                                    </div>
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserList
