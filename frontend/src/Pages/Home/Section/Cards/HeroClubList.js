import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { getNewList } from '../../../../Components/url';

function HeroClubList() {

  const [newClubData, setNewClubData] = useState()

  useEffect(() => {
    getNewClub()
  }, [])

  const getNewClub = () => {
    axios.get(getNewList, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => {
        setNewClubData(res.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div style={{display:"flex" ,flexDirection:"row" }}>
    {console.log(newClubData)}
      {newClubData && newClubData.map((item) => (
        <Card style={{ width: '18rem', marginRight:"30px" }}>
          <Card.Img style={{ height: "200px" }} variant="top" src={`${item.thumbnail}`}></Card.Img>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              <div>주제 : {item.topic}</div>
              <div>소개</div>
              <div>{item.brief_introduction}</div>
            </Card.Text>
            <Button variant="primary">상세보기</Button>
          </Card.Body>
        </Card>
      ))}
      </div>
  );
}

export default HeroClubList;