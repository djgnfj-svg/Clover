import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { applyUrl } from '../../../../Components/Apiurl';
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
                console.log(res.data)
                setApplyList(res.data);
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <headers className="Edit_title">Apply</headers>
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
                        <tr>
                            <td>박형석</td>
                            <td>저는 뭐시기뭐시</td>
                            <td style={{ display: "flex", textAlign: "right" }}>
                                <button>가입</button>
                                <button>거절</button>
                            </td>
                        </tr>
                        <tr>
                            <td>송영재</td>
                            <td>발로란트 장인 와이송</td>
                            <td>
                                <button>가입</button>
                                <button>거절</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ApplyUser
