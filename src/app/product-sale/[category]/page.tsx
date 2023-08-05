'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import type { PaginationProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import slugify from 'slugify';
import ClothesContainer from '@/components/template/ClothesContainer';

const tmp = new Array(25).fill(0);

const SaleCategory = () => {
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    // console.log(page);
    setCurrent(page);
  };

  return (
    <ClothesContainer >
      {tmp.map((p) => (
        <ClothesCard href={`/product-rental/${slugify(category!, { lower: true })}/id`} key='d' />
      ))}
      <div className='col-span-full'>
        <Pagination current={current} onChange={onChange} />
      </div>
    </ClothesContainer>
  );
};

export default SaleCategory;
