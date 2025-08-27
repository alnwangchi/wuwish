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
import { BusinessType } from '@/interface';
import { useGetRandomClothes } from '@/hooks/useGetRandomClothes';
import { Spin } from 'antd';
import { generateImgAlt } from '@/util';
import Breadcrumb from '@/components/Breadcrumb';
import { enToNameMap } from '@/constance';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BreadcrumbJsonLd } from '@/seo/json-ld';

const RentalDetailPage = () => {
  const params = useParams();
  const { category, clothId } = params;

  const { clothDetail, src } = useGetClotheDetail(clothId as string);
  const { cloth } = useGetRandomClothes({
    category: category as string,
    business_type: BusinessType.Rent,
    title: clothDetail?.title
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
      title: (
        <a className="breadcrumb" href={`/product-rent/${category}`}>
          {enToNameMap[category as string]}
        </a>
      )
    },
    {
      title: <span className="text-white">{clothDetail?.name}</span>
    }
  ];

  // 為 SEO 準備麵包屑資料
  const breadcrumbSeoItems = [
    { name: '首頁', url: 'https://www.wuwish.com.tw/' },
    { name: '服裝租借', url: 'https://www.wuwish.com.tw/product-rent' },
    {
      name: enToNameMap[category as string] || '',
      url: `https://www.wuwish.com.tw/product-rent/${category}`
    },
    {
      name: clothDetail?.name || '',
      url: `https://www.wuwish.com.tw/product-rent/${category}/${clothId}`
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbSeoItems} />
      <div>
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="container flex flex-col pb-10 sm:flex-row">
          {clothDetail ? <DetailCard src={src} data={clothDetail} /> : <LoadingSpinner />}
        </div>
        <div className="relative">
          <Image src={detail_bg} alt="detail_bg" />
          <div className="absolute left-2/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
            <Image src={relative_bg} width={400} alt="relative_bg" />
            <p className="ab-center whitespace-nowrap font-cubic text-clamp1 text-white">
              相關推薦
            </p>
          </div>
        </div>
        <ClothesContainer>
          {cloth?.map((p) => (
            <ClothesCard
              href={`/product-rent/${category}/${p.image_id}`}
              key="d"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${p.image_path}`}
              alt={generateImgAlt('服裝租借 ', p.info.category, p.info.title, p.info.name)}
            />
          ))}
        </ClothesContainer>
      </div>
    </>
  );
};

export default RentalDetailPage;
