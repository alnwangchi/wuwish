import React from 'react';
import tmp from '@/assets/img/tmp.png';
import Image from 'next/image';
import detail_bg from '@/assets/img/detail_bg.png';
import relative_bg from '@/assets/img/relative_bg.png';
import ClothesCard from '@/components/ClothesCard';
import DetailCard from '@/components/DetailCard';
import ClothesContainer from '@/components/template/ClothesContainer';

const tmpData = new Array(10).fill(0);

export default async function SaleDetail({ params }: { params: { category: string } }) {
  const { category } = params;
  return (
    <div>
      <div className="container mx-auto flex py-20 gap-10 sm:flex-row flex-col justify-center">
        <DetailCard src={tmp} />
      </div>
      <div className="relative">
        <Image src={detail_bg} alt="detail_bg" />
        <div className="absolute top-1/4 left-2/4 -translate-y-1/2 -translate-x-1/2">
          <Image src={relative_bg} width={400} alt="relative_bg" />
          <p className="ab-center text-white font-cubic text-[3vw]">相關推薦</p>
        </div>
      </div>
      <ClothesContainer>
        {tmpData.map((p) => (
          <ClothesCard href={`/product-rental/${category}/id`} key="d" />
        ))}
      </ClothesContainer>
    </div>
  );
}
