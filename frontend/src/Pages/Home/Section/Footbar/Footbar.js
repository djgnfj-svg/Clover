import React from 'react'
import '../HeroImage.css'
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";

function Footbar() {
  return (
    <>
    <div>Developer</div>
        <div className='develop'>
          <div className='frontend'>
            <div>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span>Frontend : 박형석</span>
            </div>
            <div onClick={() => window.open(['https://github.com/b-hyoung'],['_blank'])}>
              <span className='foot_img'><FaGithub /></span>
              <span>https://github.com/b-hyoung</span>
            </div>
          </div>
          <div className='frontend'>
            <div>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span>Backend : 송영재</span>
            </div>
            <div onClick={() => window.open(['https://github.com/djgnfj-svg'],['_blank'])}>
              <span className='foot_img'><FaGithub /></span>
              <span>https://github.com/djgnfj-svg</span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footbar
