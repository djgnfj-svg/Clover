import React from 'react'
import './DetailInfo.css'
import InfoDetail from './Section/InfoDetail';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function DetailInfo() {
  return (
    <div className='Detail_clubinfo'>
      <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="클럽 명">
        <div><InfoDetail /></div>
      </Tab>
      <Tab eventKey="profile" title="상세 정보"> 
         <div>As fast as thou shalt wane, so fast thou grow'st, In one of thine, from that which thou departest; And that fresh blood which youngly thou bestow'st, Thou mayst call thine when thou from youth convertest, Herein lives wisdom, beauty, and increase; Without this folly, age, and cold decay: If all were minded so, the times should cease And threescore year would make the world away. Let those whom nature hath not made for store, Harsh, featureless, and rude, barrenly perish:</div>
      </Tab>
      
    </Tabs>
    </div>
  )
}

export default DetailInfo
