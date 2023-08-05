'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import type { PaginationProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import slugify from 'slugify';

const tmp = new Array(25).fill(0);

const RentalCategory = () => {
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    // console.log(page);
    setCurrent(page);
  };

  return (
    <>
      <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
        {tmp.map((p) => (
          <ClothesCard href={`/product-rental/${slugify(category!, { lower: true })}/id`} key='d' />
        ))}
        <div className='col-span-5'>
          <Pagination current={current} onChange={onChange} />
        </div>
      </section>
    </>
  );
};

export default RentalCategory;
