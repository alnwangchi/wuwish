'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import ClothesContainer from '@/components/template/ClothesContainer';
import { ProductInfo } from '@/interface';
import { keywordSearch } from '@/server';
import { scrollToTop } from '@/util';
import type { PaginationProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [cloth, setCloth] = useState<ProductInfo[] | undefined>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(25);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!keyword) return;
    (async () => {
      const res = await keywordSearch({ keyword, currentPage });
      setCloth(res?.results);
      setTotalCount(res?.total_count);
    })();
  }, [keyword, currentPage]);

  const onChange: PaginationProps['onChange'] = (page) => {
    scrollToTop();
    setCurrentPage(page);
  };

  if (cloth?.length === 0) {
    return <div className="mid-fill f-center text-white">部分服裝尚未更新請至IG/FB詢問</div>;
  }

  return (
    <ClothesContainer>
      {cloth?.map((p: any) => (
        <ClothesCard
          href={`/product-${p.info.business_type}/${slugify(p.info.category!, {
            lower: true
          })}/${p.image_id}`}
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

export default SearchPage;
