import React, { useState } from 'react'
import './UserProfile.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';
import EditProfile from './Section/EditProfile/EditProfile';
import EditPassword from './Section/EditPassword/EditPassword';
import SecedeUser from './Section/SecedeUser/SecedeUser';

function UserProfile() {
    const navigate = useNavigate("")

    const [isChecked, setIsChecked] = useState(false)
    const [password, setPassword] = useState("");

    const handleChangeInput = (e) => {
        setPassword(e.target.value)
    }
    const handlePressEnter = (e) => {
        if(e.key === "Enter"){
            handleClickEnter()
        }
    }

    const handleClickEnter = () => {
        alert("enter");
        setIsChecked(true)
        // axios.get('패스워드 url' , password , {
        //     headers : {
        //         Authorization: `Bearer ${localStorage.getItem('access_token')}`
        //     }
        // })
        // .then(res => {
        //     console.log(res.data)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }

    const handleClickPrev = () => {
        const yes = window.confirm("이전 페이지로 이동하시겟습니까?")
        if (!!yes) {
            navigate(-1)
        } else {

        }
    }

    return (
        <div>
            {!isChecked ?
                (
                    <div className='CheckedPassword'>
                        <div className='check_password'>비밀번호를 입력해주세요</div>
                        <input type='password' value={password} onChange={(e) => handleChangeInput(e)} onKeyUp={handlePressEnter} />
                        <div onClick={() => handleClickEnter()}>
                            <button>확인</button>
                        </div>
                    </div>
                ) :
                (
                    <div className='profile_tab'>
                    <Tab.Container className="userEditTab" id="left-tabs-example" defaultActiveKey="profile">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="profile">프로필 변경</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="edit_password">비밀번호 변경</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="secede_user">회원 탈퇴</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => handleClickPrev()}>이전 페이지</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="profile">
                                        <EditProfile />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="edit_password">
                                        <EditPassword />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="secede_user">
                                        <SecedeUser />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    </div>
                )
            }
        </div >
    )
}

export default UserProfile
