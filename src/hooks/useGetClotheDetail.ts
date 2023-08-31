import { ProductDetail } from '@/interface';
import { getClothDetail } from '@/server';
import { useEffect, useState } from 'react';

export const useGetClotheDetail = (id: string) => {
  const [clothDetail, setClothDetail] = useState<ProductDetail | undefined>();
  const [src, setSrc] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getClothDetail(id);
      setClothDetail(res?.info);
      setSrc(res?.image_path);
    })();
  }, [id]);

  return { clothDetail, src };
};
