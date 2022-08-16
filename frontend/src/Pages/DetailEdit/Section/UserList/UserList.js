import React from 'react'
import './UserList.css'
import { CgCloseR } from "@react-icons/all-files/cg/CgCloseR";

function UserList() {
    return (
        <div>
            <headers className="Edit_title">Clover</headers>
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
                        <tr>
                            <td>박형석</td>
                            <td>test@naver.cold</td>
                            <td>010-4431-2231</td>
                            <td>마스터</td>
                            <td style={{textAlign : "center" , fontSize:"20px"}}><CgCloseR /></td>
                        </tr>
                        <tr>
                            <td>송영재</td>
                            <td>djgnfj@naver.cold</td>
                            <td>010-3212-3451</td>
                            <td>매니저</td>
                            <td style={{textAlign : "center" , fontSize:"20px"}}><CgCloseR /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList
