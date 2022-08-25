import React, { Component , useState } from "react";
import Slider from "react-slick";
import './HeroImage.css'
import "./slick/slick.css"
import "./slick/slick-theme.css";

function HeroImage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="hero_Main">
      <Slider {...settings}>
        <div className="rank">
          <img src={`${process.env.PUBLIC_URL}/image/hhh.png`} />
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default HeroImage
