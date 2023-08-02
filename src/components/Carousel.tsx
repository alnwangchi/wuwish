'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import ball_icon from '@/assets/img/ball_icon.png';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import c1 from '@/assets/img/c1.jpg';
import c2 from '@/assets/img/c2.jpg';
import c3 from '@/assets/img/c3.jpg';

export default function Carousel() {
  const carouselRef = useRef<Slider | null>(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // 官網範例有夠爛 根本沒用
    arrows: false,
    // nextArrow: <div className='w-5 h20 bg-orange-600'></div>,
    // prevArrow: <div className='w-5 h20 bg-orange-600'></div>,
    dots: true,
    customPaging: function (i: number) {
      return <Image src={ball_icon} width={30} height={30} alt='TBC' />;
    },
  };
  return (
    <div className='relative'>
      <div
        className='absolute top-2/4 -left-10 -translate-y-1/2 z-10'
        onClick={() => {
          carouselRef.current!.slickPrev();
        }}
      >
        <Image src={ball_icon} width={30} height={30} alt='TBC' />
      </div>
      <Slider {...settings} ref={carouselRef}>
        <div>
          <Image src={c1} alt='' />
        </div>
        <div>
          <Image src={c2} alt='' />
        </div>
        <div>
          <Image src={c3} alt='' />
        </div>
      </Slider>
      <div
        className='absolute top-2/4 -right-10 -translate-y-1/2 z-10'
        onClick={() => {
          carouselRef.current!.slickNext();
        }}
      >
        <Image src={ball_icon} width={30} height={30} alt='TBC' />
      </div>
    </div>
  );
}
