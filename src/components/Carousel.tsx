'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Settings } from 'react-slick';
import { db } from '@/lib/firebase';

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
import { collection, getDocs } from 'firebase/firestore';

const Slider = dynamic(() => import('react-slick'), { ssr: false }) as any;

const paginationImg = [
  draganball_1,
  draganball_2,
  draganball_3,
  draganball_4,
  draganball_5,
  draganball_6,
  draganball_7
];
type BannerImage = {
  order: number;
  src: string;
  alt: string;
};

const settings: Settings = {
  autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  arrows: false,
  dots: true,
  customPaging: function (i: number) {
    return (
      <Image src={paginationImg[i]} alt={`神龍變裝輪播 ${i}星球`} aria-label={`跳轉到第${i}張圖`} />
    );
  }
};

export default function Carousel() {
  const carouselRef = useRef<any>(null);
  const [images, setImages] = useState<BannerImage[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'banners'));

        const banners = querySnapshot.docs.map((doc) => {
          return {
            order: doc.data().order || 0,
            src: doc.data().downloadURL || '',
            alt: doc.data().imageAlt || ''
          };
        });

        banners.sort((a, b) => a.order - b.order);

        setImages(banners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute -left-10 top-2/4 z-10 hidden -translate-y-1/2 sm:block"
        onClick={() => {
          carouselRef.current?.slickPrev();
        }}
      >
        <Image
          src={carousel_left}
          alt="向左滑動"
          className="cursor-pointer contrast-50 hover:contrast-100"
          priority
        />
      </div>
      <Slider {...settings} ref={carouselRef}>
        {(images.length > 0 ? images : [{ order: 0, src: '', alt: '' }]).map((image, index: number) => (
          <div key={index} className="relative aspect-[1348/605] w-full">
            <Image
              src={image.src || c1}
              alt={image.alt || '活動檔期公告輪播'}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
      <div
        className="absolute -right-10 top-2/4 z-10 hidden  -translate-y-1/2 sm:block"
        onClick={() => {
          carouselRef.current?.slickNext();
        }}
      >
        <Image
          src={carousel_right}
          alt="向右滑動"
          className="cursor-pointer contrast-50 hover:contrast-100"
          priority
        />
      </div>
    </div>
  );
}
