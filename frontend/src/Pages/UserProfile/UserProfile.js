import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';
import EditProfile from './Section/EditProfile/EditProfile';
import EditPassword from './Section/EditPassword/EditPassword';
import SecedeUser from './Section/SecedeUser/SecedeUser';
import axios from 'axios';
import { userInfoUrl } from '../../Components/Apiurl';

function UserProfile() {
    const navigate = useNavigate("")

    const [userInfo , setUserInfo] = useState();

    useEffect(() => {
        getUserInfo()
    },[])

    const handleClickPrev = () => {
        const yes = window.confirm("이전 페이지로 이동하시겟습니까?")
        if (!!yes) {
            navigate(-1)
        } else {
        }
    }

    const getUserInfo = () => {
        axios.get(userInfoUrl , {
            headers : {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }).then(res =>{
            setUserInfo(res.data[0])
          })
    }


    return (
        <div>
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
                                {userInfo && (
                                    <Tab.Pane eventKey="profile">
                                        <EditProfile info={userInfo} />
                                    </Tab.Pane>
                                )}
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
        </div >
    )
}

export default UserProfile
