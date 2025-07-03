'use client';
import Carousel from '@/components/Carousel';
import CategoryItem from '@/components/CategoryItem';
import CategoryContainer from '@/components/template/CategoryContainer';
import { categoryList } from '@/constance';
import carousel_bg from '@/assets/img/carousel_bg.png';
import Image from 'next/image';
import slugify from 'slugify';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative mb-10">
        <Image src={carousel_bg} sizes="100vw" alt="神龍變裝輪播圖" />
        <div className="ab-center">
          <div className="w-[70vw]">
            <Carousel />
          </div>
        </div>
      </div>
      <CategoryContainer>
        {categoryList.map((c) => (
          <CategoryItem
            text={c.name}
            key={c.name}
            href={`/product-rent/${slugify(c.en, { lower: true })}`}
            alt={c.name + '按鈕'}
          />
        ))}
      </CategoryContainer>
    </main>
  );
}
