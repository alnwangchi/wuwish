import { BusinessType, ProductInfo } from '@/interface';
import { queryApi } from '@/server';
import { getRandomItemsFromArray } from '@/util';
import { useEffect, useState } from 'react';

interface useGetClothesParamsType {
  business_type: BusinessType;
  category?: string;
}

export const useGetRandomClothes = ({ business_type, category }: useGetClothesParamsType) => {
  const [cloth, setCloth] = useState<ProductInfo[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const res = await queryApi({
        business_type,
        page_number: 1,
        page_size: 10,
        category,
        is_random: true
      });
      console.log('🚀 ~ res:', res);

      const total = res?.total_count || 0;

      if (total > 10) {
        const randomClothes = getRandomItemsFromArray(res?.results, 10);
        setCloth(randomClothes);
      } else {
        setCloth(res?.results);
      }
    })();
  }, []);

  return { cloth };
};
