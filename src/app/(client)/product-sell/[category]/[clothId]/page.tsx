'use client';
import React from 'react';
import Image from 'next/image';
import detail_bg from '@/assets/img/detail_bg.png';
import relative_bg from '@/assets/img/relative_bg.png';
import ClothesCard from '@/components/ClothesCard';
import DetailCard from '@/components/DetailCard';
import ClothesContainer from '@/components/template/ClothesContainer';
import { useParams } from 'next/navigation';
import { useGetClotheDetail } from '@/hooks/useGetClotheDetail';
import { useGetRandomClothes } from '@/hooks/useGetRandomClothes';
import { BusinessType } from '@/interface';
import { Spin } from 'antd';

const SaleDetailPage = () => {
  const params = useParams();
  const { category, clothId } = params;

  const { clothDetail, src } = useGetClotheDetail(clothId as string);
  const { cloth } = useGetRandomClothes({
    category: category as string,
    business_type: BusinessType.Sell,
    title: clothDetail?.title
  });

  return (
    <div>
      <div className="container flex py-8 sm:gap-10 sm:flex-row flex-col justify-center sm:justify-start">
        {clothDetail ? (
          <DetailCard src={src} data={clothDetail} />
        ) : (
          <div className="grow min-h-[40vh] f-center">
            <Spin size="large"></Spin>
            <p className="text-white">載入中....</p>
          </div>
        )}
      </div>
      <div className="relative">
        <Image src={detail_bg} alt="detail_bg" />
        <div className="absolute top-1/4 left-2/4 -translate-y-1/2 -translate-x-1/2">
          <Image src={relative_bg} width={400} alt="relative_bg" />
          <p className="ab-center text-white font-cubic text-clamp1 whitespace-nowrap">相關推薦</p>
        </div>
      </div>
      <ClothesContainer>
        {cloth?.map((p) => (
          <ClothesCard
            href={`/product-rent/${category}/${p.image_id}`}
            key="d"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${p.image_path}`}
          />
        ))}
      </ClothesContainer>
    </div>
  );
};

export default SaleDetailPage;
