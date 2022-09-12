import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import './HeroImage.css'
import "./slick/slick.css"
import "./slick/slick-theme.css";
import { getNewList } from "../../../Components/Apiurl";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function HeroImage() {

  const navigate = useNavigate()

  const [newClubData, setNewClubData] = useState("")

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getNewClub()
  }, [])

  const getNewClub = () => {
    axios.get(getNewList,
      {

      })
      .then(res => {
        setNewClubData(res.data.results)
        console.log(res.data.results)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="hero_Main">
      <Slider {...settings}>
        {newClubData && newClubData.map((item) => (
          <div className="rank" onClick={() => navigate(`/clubs/${item.id}`)}>
            <h4>{item.title}</h4>
            <img src={item.thumbnail} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroImage
