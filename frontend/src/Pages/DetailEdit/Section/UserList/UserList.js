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
            alert("???????????? !")
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
                alert("?????? !")
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
            alert("??????")
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
                        <input placeholder='?????? ????????? ????????? ????????? !' />
                        <span className="material-symbols-outlined">search</span> {/* ?????? ?????????  */}
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>??????</th>
                                    <th>??????</th>
                                    <th>??????</th>
                                    <th>???????????? ?????????</th>
                                </tr>
                            </thead>
                            <tbody>
                                {master && (
                                    <tr>
                                        <td>{master.username}</td>
                                        <td>{master.user_instroduction}</td>
                                        <td>?????????</td>
                                    </tr>
                                )}
                                {manangerList && manangerList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td>{item.user_instroduction}</td>
                                        <td>????????? <button onClick={() => managerDownUser(item.id)}>????????? ??????</button>
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
                                        <td>??????<button onClick={() => userUpManager(item.id)}>????????? ??????</button></td>
                                        {/* <td>??????{master &&
                                                (<span ref={dropdownUserRef} onClick={() => handleClickDropdownUser()} > <FaRegArrowAltCircleDown /></span>)}</td> */}
                                        <td onClick={() => handleOutMyClub(item.id)} style={{ textAlign: "center", fontSize: "20px", paddingLeft: "0vw" }}><CgCloseR /></td>
                                    </tr>
                                ))}
                                {/* {managerDropdown && (
                                    <div className='editUserRank'>
                                        <div>????????? ??????</div>
                                    </div>
                                )}
                                  {userDropdown && (
                                    <div className='editUserRank'>
                                        <div>????????? ??????</div>
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
