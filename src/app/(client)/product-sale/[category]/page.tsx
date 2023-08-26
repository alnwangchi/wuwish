'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import type { PaginationProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import slugify from 'slugify';
import ClothesContainer from '@/components/template/ClothesContainer';
import { BusinessType } from '@/interface';
import { useGetClothes } from '@/hooks/useGetClothes';

const SaleCategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const { cloth, totalCount } = useGetClothes({
    business_type: BusinessType.Sell,
    category,
    currentPage
  });

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <ClothesContainer>
      {cloth?.map((p: any) => (
        <ClothesCard
          href={`/product-sale/${slugify(category!, { lower: true })}/${p.image_id}`}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${p.image_path}`}
          key={p.image_id}
          alt="imageUrl"
        />
      ))}
      <div className="col-span-full">
        <Pagination current={currentPage} onChange={onChange} total={totalCount} />
      </div>
    </ClothesContainer>
  );
};

export default SaleCategoryPage;
