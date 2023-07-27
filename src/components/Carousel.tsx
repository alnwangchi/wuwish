import React from 'react';
import carousel_bg from '@/assets/img/carousel_bg.png';
import Image from 'next/image';

const Carousel = () => {
  return (
    <div>
      <Image src={carousel_bg} sizes='100vw' alt='TBC' />
    </div>
  );
};

export default Carousel;
