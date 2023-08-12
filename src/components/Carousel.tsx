'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

import draganball_1 from '@/assets/img/draganball_1.png';
import draganball_2 from '@/assets/img/draganball_2.png';
import draganball_3 from '@/assets/img/draganball_3.png';
import draganball_4 from '@/assets/img/draganball_4.png';
import draganball_5 from '@/assets/img/draganball_5.png';
import draganball_6 from '@/assets/img/draganball_6.png';
import draganball_7 from '@/assets/img/draganball_7.png';

import carousel_right from '@/assets/img/carousel_right.png';
import carousel_left from '@/assets/img/carousel_left.png';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import c1 from '@/assets/img/c1.jpg';
import c2 from '@/assets/img/c2.jpg';
import c3 from '@/assets/img/c3.jpg';

const paginationImg = [
  draganball_1,
  draganball_2,
  draganball_3,
  draganball_4,
  draganball_5,
  draganball_6,
  draganball_7
];
export default function Carousel() {
  const carouselRef = useRef<Slider | null>(null);
  const settings = {
    autoplay: true,
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
      return <Image src={paginationImg[i]} alt="TBC" />;
    }
  };
  return (
    <div className="relative">
      <div
        className="absolute top-2/4 -left-10 -translate-y-1/2 z-10 hidden sm:block"
        onClick={() => {
          carouselRef.current!.slickPrev();
        }}
      >
        <Image
          src={carousel_left}
          alt="TBC"
          className="cursor-pointer contrast-50 hover:contrast-100"
        />
      </div>
      <Slider {...settings} ref={carouselRef}>
        <div>
          <Image src={c1} alt="" />
        </div>
        <div>
          <Image src={c2} alt="" />
        </div>
        <div>
          <Image src={c3} alt="" />
        </div>
        <div>
          <Image src={c1} alt="" />
        </div>
        <div>
          <Image src={c2} alt="" />
        </div>
        <div>
          <Image src={c3} alt="" />
        </div>
        <div>
          <Image src={c1} alt="" />
        </div>
      </Slider>
      <div
        className="absolute top-2/4 -right-10 -translate-y-1/2 z-10  hidden sm:block"
        onClick={() => {
          carouselRef.current!.slickNext();
        }}
      >
        <Image
          src={carousel_right}
          alt="TBC"
          className="cursor-pointer contrast-50 hover:contrast-100"
        />
      </div>
    </div>
  );
}
