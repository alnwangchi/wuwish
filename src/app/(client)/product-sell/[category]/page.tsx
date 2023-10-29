'use client';
import ClothesCard from '@/components/ClothesCard';
import Pagination from '@/components/Pagination';
import ClothesContainer from '@/components/template/ClothesContainer';
import { useGetClothes } from '@/hooks/useGetClothes';
import { BusinessType } from '@/interface';
import type { PaginationProps } from 'antd';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import slugify from 'slugify';

const SaleCategoryPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const { cloth, totalCount } = useGetClothes({
    business_type: BusinessType.Sell,
    category,
    currentPage: Number(currentPage)
  });

  const onChange: PaginationProps['onChange'] = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  if (_.isEmpty(cloth)) {
    return (
      <div className="f-center mid-fill">
        <h1 className="text-center text-white">目前無此類販售服裝</h1>
      </div>
    );
  }

  return (
    <ClothesContainer>
      {cloth?.map((p: any) => (
        <ClothesCard
          href={`/product-sell/${slugify(category!, { lower: true })}/${p.image_id}`}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${p.image_path}`}
          key={p.image_id}
          alt="imageUrl"
        />
      ))}
      <div className="col-span-full">
        <Pagination current={Number(currentPage)} onChange={onChange} total={totalCount} />
      </div>
    </ClothesContainer>
  );
};

export default SaleCategoryPage;
