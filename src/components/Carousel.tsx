'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
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
import Slider from './SlickSliderClient';

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
  src: string | StaticImageData;
  alt: string;
};

const fallbackImages: BannerImage[] = [{ order: 1, src: c1, alt: '活動檔期公告輪播' }];

const getImageKey = (image: BannerImage) =>
  `${image.order}-${typeof image.src === 'string' ? image.src : image.src.src}`;

const createSettings = (slideCount: number): Settings => ({
  autoplay: slideCount > 1,
  infinite: slideCount > 1,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  arrows: false,
  dots: slideCount > 1,
  customPaging: function (i: number) {
    const pagination = paginationImg[i % paginationImg.length];

    return (
      <Image
        src={pagination}
        alt={`神龍變裝輪播 ${i + 1}星球`}
        aria-label={`跳轉到第${i + 1}張圖`}
      />
    );
  }
});

export default function Carousel() {
  const carouselRef = useRef<any>(null);
  const [images, setImages] = useState<BannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const settings = useMemo(() => createSettings(images.length), [images.length]);
  const sliderKey = useMemo(() => images.map(getImageKey).join('|'), [images]);
  const handleSliderInstance = useCallback((instance: any) => {
    carouselRef.current = instance;
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'banners'));

        const banners = querySnapshot.docs
          .map((doc) => {
            return {
              order: doc.data().order || 0,
              src: doc.data().downloadURL || '',
              alt: doc.data().imageAlt || ''
            };
          })
          .filter((banner): banner is BannerImage => !!banner.src);

        banners.sort((a, b) => a.order - b.order);

        setImages(banners.length > 0 ? banners : fallbackImages);
      } catch (error) {
        const errorCode =
          typeof error === 'object' && error && 'code' in error ? error.code : undefined;
        console.error('[Carousel] fetch banners failed', {
          projectId: db.app.options.projectId,
          errorCode,
          error
        });
        setImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // 後台圖片載入完成前只保留版位，避免先閃一張預設圖
  if (isLoading || images.length === 0) {
    return <div className="aspect-[1348/605] w-full animate-pulse bg-black/30" aria-hidden />;
  }

  return (
    <div className="relative">
      <div
        className="absolute left-1 top-2/4 z-10 hidden -translate-y-1/2 sm:block"
        onClick={() => {
          carouselRef.current?.slickPrev();
        }}
      >
        <Image
          src={carousel_left}
          alt="向左滑動"
          className="cursor-pointer opacity-60 contrast-50 hover:opacity-100 hover:contrast-100"
          priority
        />
      </div>
      <Slider key={sliderKey} {...settings} onInstance={handleSliderInstance}>
        {images.map((image, index: number) => (
          <div key={getImageKey(image)} className="relative aspect-[1348/605] w-full">
            <Image
              src={image.src}
              alt={image.alt || '活動檔期公告輪播'}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
      <div
        className="absolute right-1 top-2/4 z-10 hidden -translate-y-1/2 sm:block"
        onClick={() => {
          carouselRef.current?.slickNext();
        }}
      >
        <Image
          src={carousel_right}
          alt="向右滑動"
          className="cursor-pointer opacity-60 contrast-50 hover:opacity-100 hover:contrast-100"
          priority
        />
      </div>
    </div>
  );
}
