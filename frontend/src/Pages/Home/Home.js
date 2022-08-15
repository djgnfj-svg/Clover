import React from 'react'
import './Home.css'
import HeroClubList from './Section/Cards/HeroClubList'
import HeroImage from './Section/HeroImage'
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";


function Home() {
  return (
    <div className='home' style={{position:"relative" , margin:"0 auto" , display:"flex" , flexDirection:"column" , height : "maxContent"}}>
       <div className='hero-image'>
          <HeroImage />
       </div>
       <div className='hero-ClubList'>
        <HeroClubList />
       </div>
       <div className='footbar'>
        <div>Developer</div>
        <div className='develop'>
          <div className='frontend'>
            <div>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span>Frontend : 박형석</span>
            </div>
            <div>
              <span className='foot_img'><FaGithub /></span>
              <span>https://github.com/b-hyoung</span>
            </div>
          </div>
          <div className='frontend'>
            <div>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span>Backend : 송영재</span>
            </div>
            <div>
              <span className='foot_img'><FaGithub /></span>
              <span>https://github.com/djgnfj-svg</span>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Home
