import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { clubDetail } from '../../Components/Apiurl';
import ApplyUser from './Section/ApplyUser/ApplyUser';
import ClubInfo from './Section/ClubInfo/ClubInfo';
import UserList from './Section/UserList/UserList';
import ClubSetting from './Section/ClubSetting/ClubSetting';
import DeleteClub from './Section/DeleteClub/DeleteClub';

function DetailEdit() {

  const { id } = useParams();
  const navigate = useNavigate("")
  const [profile, setProfile] = useState();

  useEffect(() => {
    getClubData()
  }, [])

  const getClubData = () => {
    axios.get(clubDetail(id),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => {
        setProfile(res.data)
        console.log(res.data)
      })
  }

  const handleClickPrev = () => {
    const yes = window.confirm("이전 페이지로 이동하시겟습니까?")
    if (!!yes) {
      navigate(-1)
    } else {

    }
  }
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="setting">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="setting">클럽 관리</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="info">클럽 소개</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users">유저 관리</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="apply">가입 신청</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="close_club">클럽 해체하기</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleClickPrev()}>이전 페이지</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          {profile && (
            <Tab.Content>
              <Tab.Pane eventKey="setting">
                <ClubSetting info={profile} />
              </Tab.Pane>
              <Tab.Pane eventKey="info">
                <ClubInfo file={profile} />
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                <UserList />
              </Tab.Pane>
              <Tab.Pane eventKey="apply">
                <ApplyUser />
              </Tab.Pane>
              <Tab.Pane eventKey="close_club">
                <DeleteClub />
              </Tab.Pane>
            </Tab.Content>
          )}
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default DetailEdit;