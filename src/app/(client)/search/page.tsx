'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import ClothesContainer from '@/components/template/ClothesContainer';
import { ProductInfo } from '@/interface';
import { keywordSearch } from '@/server';
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
    (async () => {
      const res = await keywordSearch(keyword);
      console.log('🚀 ~ res:', res);
      setCloth(res?.results);
      setTotalCount(res?.total_count);
    })();
  }, [keyword]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <ClothesContainer>
      {cloth?.map((p: any) => (
        <ClothesCard
          href={`/product-sale/${slugify(p.info.category!, { lower: true })}/${p.image_id}`}
          src={`http://127.0.0.1:9527/${p.image_path}`}
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
