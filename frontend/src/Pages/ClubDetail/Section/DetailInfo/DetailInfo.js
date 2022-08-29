import React from 'react'
import './DetailInfo.css'
import InfoDetail from './Section/InfoDetail';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Viewer } from '@toast-ui/react-editor';

function DetailInfo({info}) {

  return (
    <div className='Detail_clubinfo'>
      <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title={info.title}>
        <div>{info.description === "" ? (
          <>
            <h4>클럽 상세정보를 변경해주세요 ! </h4>
          </>
        ) : (
          <>
          <Viewer className="testing" initialValue={info.description} />
          </>
        )
      }</div>
      </Tab>
      {/* <Tab eventKey="gongzi" title="공지사항">
        <div>
            <img />
            <div>
              <div>
                <div>이름</div>
                <div>언제 올렸는가</div>
              </div>
              <div> 공지사항 내용</div>
            </div>
        </div>       
      </Tab> */}
    </Tabs>
    </div>
  )
}

export default DetailInfo
