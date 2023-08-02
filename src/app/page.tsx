'use client';
import Carousel from '@/components/Carousel';
import CategoryItem from '@/components/CategoryItem';
import { tmpCategory } from '@/constance';
import carousel_bg from '@/assets/img/carousel_bg.png';
import Image from 'next/image';
import slugify from 'slugify';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className='relative'>
        <Image src={carousel_bg} sizes='100vw' alt='TBC' />
        <div className='ab-center'>
          <div className='w-[70vw]'>
            <Carousel />
          </div>
        </div>
      </div>
      <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
        {tmpCategory.map((c) => (
          <CategoryItem text={c.name} key={c.name} href={`/product-rental/${slugify(c.en)}`} />
        ))}
      </section>
    </main>
  );
}
