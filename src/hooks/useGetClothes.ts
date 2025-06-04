import { BusinessType, ProductInfo } from '@/interface';
import { queryApi } from '@/server';
import { useEffect, useState } from 'react';

interface useGetClothesParamsType {
  business_type: BusinessType;
  currentPage: number;
  category?: string;
}

export const useGetClothes = ({
  business_type,
  category,
  currentPage
}: useGetClothesParamsType) => {
  const [cloth, setCloth] = useState<ProductInfo[] | undefined>(undefined);
  const [totalCount, setTotalCount] = useState<number | undefined>(25);

  useEffect(() => {
    (async () => {
      const res = await queryApi({
        business_type,
        page_number: currentPage,
        page_size: 25,
        category
      });
      setCloth(res?.results);
      setTotalCount(res?.total_count);
    })();
  }, [currentPage, business_type, category]);

  return { cloth, totalCount };
};
