'use client';
import Breadcrumb from '@/components/Breadcrumb';
import ClothEmpty from '@/components/ClothEmpty';
import ClothesCard from '@/components/ClothesCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import ClothesContainer from '@/components/template/ClothesContainer';
import { enToNameMap } from '@/constance';
import { useGetClothes } from '@/hooks/useGetClothes';
import { BusinessType } from '@/interface';
import { generateImgAlt } from '@/util';
import { type PaginationProps } from 'antd';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import slugify from 'slugify';

const RentalCategoryPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const category = pathname.split('/').at(-1);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;

  const { cloth, totalCount } = useGetClothes({
    business_type: BusinessType.Rent,
    category,
    currentPage: Number(currentPage)
  });

  const breadcrumbItems = [
    {
      title: (
        <a className="breadcrumb" href="/">
          首頁
        </a>
      )
    },
    {
      title: (
        <a className="breadcrumb" href="/product-rent">
          服裝租借
        </a>
      )
    },
    {
      title: <span className="text-white">{enToNameMap[category as string]}</span>
    }
  ];

  const onChange: PaginationProps['onChange'] = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  if (!cloth) {
    return <LoadingSpinner />;
  }

  if (_.isEmpty(cloth)) {
    return <ClothEmpty />;
  }

  return (
    <>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ClothesContainer>
        {cloth?.map((p: any) => (
          <ClothesCard
            href={`/product-rent/${slugify(category!, { lower: true })}/${p.image_id}`}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${p.image_path}`}
            key={p.image_id}
            alt={generateImgAlt('服裝租借 ', p.info.category, p.info.title, p.info.name)}
          />
        ))}
        <div className="col-span-full">
          <Pagination current={Number(currentPage)} onChange={onChange} total={totalCount} />
        </div>
      </ClothesContainer>
    </>
  );
};

export default RentalCategoryPage;
