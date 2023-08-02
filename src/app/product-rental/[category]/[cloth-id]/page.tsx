import React from 'react';
import tmp from '@/assets/img/tmp.png';
import Image from 'next/image';
import detail_bg from '@/assets/img/detail_bg.png';
import relative_bg from '@/assets/img/relative_bg.png';
import ClothesCard from '@/components/ClothesCard';

const tmpData = new Array(10).fill(0);

export default async function RentalDetail({ params }: { params: { category: string } }) {
  console.log(params);
  const { category } = params;

  return (
    <div className=''>
      <div className='container mx-auto flex py-20 gap-10'>
        <div className='w-2/4 f-center'>
          <Image src={tmp} alt='TBC' />
        </div>
        <div className='space-y-3 pt-5 text-white font-cubic text-3xl'>
          <p>
            <span className=''>編號 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>類別 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>劇名 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>名稱 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>內容 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>價格 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>狀態 : </span>
            <span className=''>xxxxx</span>
          </p>
          <p>
            <span className=''>情境: : </span>
            <span className=''>xxxxx</span>
          </p>
        </div>
      </div>
      <div className='relative'>
        <Image src={detail_bg} alt='detail_bg' />
        <div className='absolute top-1/4 left-2/4 -translate-y-1/2 -translate-x-1/2'>
          <Image src={relative_bg} width={400} alt='relative_bg' />
          <p className='ab-center text-white font-cubic text-4xl'>相關推薦</p>
        </div>
      </div>
        <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
          {tmpData.map((p) => (
            <ClothesCard href={`/product-rental/${category}/id`} key='d' />
          ))}
        </section>
    </div>
  );
}
