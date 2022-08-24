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
            <h4>클럽 설명을 적어주세요 ! </h4>
          </>
        ) : (
          <>
          <Viewer initialValue={info.description} />
          </>
        )
      }</div>
      </Tab>
    </Tabs>
    </div>
  )
}

export default DetailInfo
