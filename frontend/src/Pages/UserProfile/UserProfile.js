import React from 'react'
import './UserProfile.css'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
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
              <ClubInfo />
            </Tab.Pane>
            <Tab.Pane eventKey="edit_password">
              <UserList />
            </Tab.Pane>
            <Tab.Pane eventKey="secede_user">
              <ApplyUser />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  )
}

export default UserProfile
