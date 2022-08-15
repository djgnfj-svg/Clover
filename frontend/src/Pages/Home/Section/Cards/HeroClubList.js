import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HeroClubList() {
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img style={{height : "200px"}} variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>뷀로란트</Card.Title>
        <Card.Text>
          <div>소모임 주제</div>
          <div> 20글자 내 설명쓰셈</div>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
}

export default HeroClubList;