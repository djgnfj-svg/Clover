import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { applyOutUrl, applyUrl } from '../../../../Components/Apiurl';
import './ApplyUser.css'

function ApplyUser() {

    const { id } = useParams();

    const [applyList, setApplyList] = useState("")


    useEffect(() => {
        getApplyList()
    }, [])

    const getApplyList = () => {
        axios.get(applyUrl(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => {
                setApplyList(res.data);
            }).catch(error => {
                console.log(error)
            })
    }

    const handleSucessApply = (userid) => {
        axios.post(applyUrl(id), {
            userid : userid
        },
        {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }}  
        ).then(res => {
            console.log(res)
            alert("새로운 유저를 환영해주세요 ! ")
        }).catch(error => {
            console.log(error)
        })
    }
    const handleOutApply = (ids) => {
        alert(applyOutUrl(id))
        axios.delete(applyOutUrl(id)+`?userid=${ids}` ,
            {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <headers className="Edit_title">Apply</headers>
            {applyList && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='table_name'>이름</th>
                                <th className='table_info'>소개</th>
                                <th className='table_apply'>가입 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applyList.map((item) => (
                                <tr>
                                    <td>{item.username}</td>
                                    <td>저는 뭐시기뭐시</td>
                                    <td style={{ display: "flex", textAlign: "right" }}>
                                        <button onClick={() => handleSucessApply(item.id)}>가입</button>
                                        <button onClick={() => handleOutApply(item.id)}>거절</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ApplyUser
