import react from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';
import ClubInfo from './Section/ClubInfo/ClubInfo';
import UserList from './Section/UserList/UserList';

function DetailEdit() {
  
  const navigate = useNavigate("")

  const handleClickPrev = () => {
    const yes = window.confirm("이전 페이지로 이동하시겟습니까?")
    if(!!yes){
      navigate("/club/clubdetail")
    }else{
      
    }
  }
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="info">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="info">클럽 소개</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users">유저 관리</Nav.Link>
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
          <Tab.Content>
            <Tab.Pane eventKey="info">
              <ClubInfo />
            </Tab.Pane>
            <Tab.Pane eventKey="users">
              <UserList />
            </Tab.Pane>
            <Tab.Pane eventKey="close_club">
              helloasd
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default DetailEdit;