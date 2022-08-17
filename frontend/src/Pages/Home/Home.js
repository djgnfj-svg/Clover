import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import HeroClubList from './Section/Cards/HeroClubList'
import HeroImage from './Section/HeroImage'

import Footbar from './Section/Footbar/Footbar'


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
        <Footbar />
       </div>
    </div>
  )
}

export default Home
