'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import type { PaginationProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import ClothesContainer from '@/components/template/ClothesContainer';
import { queryApi } from '@/server';
import { BusinessType } from '@/interface';

const tmp = new Array(25).fill(0);

const RentalCategory = () => {
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);

  const [currentPage, setCurrentPage] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    (async () => {
      const res = await queryApi({
        business_type: BusinessType.Rent,
        page_number: currentPage,
        page_size: 25,
        category: category
      });
      console.log(res);
    })();
  }, [currentPage]);

  return (
    <>
      <ClothesContainer>
        {tmp.map((p) => (
          <ClothesCard href={`/product-rental/${slugify(category!, { lower: true })}/id`} key="d" />
        ))}
        <div className="col-span-full">
          <Pagination current={currentPage} onChange={onChange} />
        </div>
      </ClothesContainer>
    </>
  );
};

export default RentalCategory;
