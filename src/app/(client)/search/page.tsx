'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import ClothesContainer from '@/components/template/ClothesContainer';
import { ProductInfo } from '@/interface';
import { keywordSearch } from '@/server';
import _ from 'lodash';
import type { PaginationProps } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { generateImgAlt } from '@/util';

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [cloth, setCloth] = useState<ProductInfo[] | undefined>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(25);
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    if (!keyword) return;
    (async () => {
      const res = await keywordSearch({ keyword, currentPage: Number(currentPage) });
      setCloth(res?.results);
      setTotalCount(res?.total_count);
    })();
  }, [keyword, currentPage]);

  const onChange: PaginationProps['onChange'] = (page) => {
    router.push(`${pathname}?keyword=${keyword}&page=${page}`);
  };

  if (_.isEmpty(cloth)) {
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
          alt={generateImgAlt('服裝', p.info.category, p.info.title, p.info.name)}
        />
      ))}
      <div className="col-span-full">
        <Pagination current={Number(currentPage)} onChange={onChange} total={totalCount} />
      </div>
    </ClothesContainer>
  );
};

export default SearchPage;
