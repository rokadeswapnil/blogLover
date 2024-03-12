import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DynamicCarousel = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className=" h-64 lg:h-96 pt-4 relative">
            <img src={item.featuredImage} alt={item.title} className="h-full w-full object-contain  " />
            <div className="absolute inset-5 flex flex-col justify-end items-center  text-black ">
              <h2 className=" w-1/2 text-white shadow-lg text-center text-3xl font-bold backdrop-blur-lg py-2 px-4 ">{item.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DynamicCarousel;
