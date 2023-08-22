import { BusinessType, ProductInfo } from '@/interface';
import { getClothDetail } from '@/server';
import { useEffect, useState } from 'react';

export const useGetClotheDetail = (id: string) => {
  const [clothDetail, setClothDetail] = useState<ProductInfo[] | undefined>([]);
  const [src, setSrc] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getClothDetail(id);
      setClothDetail(res?.info);
      setSrc(res?.image_path);
    })();
  }, []);

  return { clothDetail, src };
};
