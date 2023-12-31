import { BusinessType, ProductInfo } from '@/interface';
import { queryApi } from '@/server';
import { getRandomItemsFromArray } from '@/util';
import { useEffect, useState } from 'react';

interface useGetClothesParamsType {
  business_type: BusinessType;
  category?: string;
  title?: string;
}

// 推薦相同劇名的
export const useGetRandomClothes = ({
  business_type,
  category,
  title
}: useGetClothesParamsType) => {
  const [cloth, setCloth] = useState<ProductInfo[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const res = await queryApi({
        business_type,
        page_number: 1,
        page_size: 10,
        category,
        title,
        is_random: true
      });

      const total = res?.total_count || 0;

      if (total > 10) {
        const randomClothes = getRandomItemsFromArray(res?.results, 10);
        setCloth(randomClothes);
      } else {
        setCloth(res?.results);
      }
    })();
  }, [business_type, category, title]);

  return { cloth };
};
