'use client';
import CategoryItem from '@/components/CategoryItem';
import { categoryList, saleCategoryList } from '@/constance';
import React from 'react';
import slugify from 'slugify';
import CategoryContainer from '@/components/template/CategoryContainer';
import Breadcrumb from '@/components/Breadcrumb';
// import { Metadata } from 'next';

const breadcrumbItems = [
  {
    title: (
      <a className="breadcrumb" href="/">
        首頁
      </a>
    )
  },
  {
    title: <span className="text-white">服裝租借</span>
  }
];

const page = () => {
  return (
    <>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <CategoryContainer>
        {categoryList.map((c) => (
          <CategoryItem
            text={c.name}
            key={c.name}
            href={`/product-rent/${slugify(c.en, { lower: true })}`}
            alt={c.name + '按鈕'}
          />
        ))}
      </CategoryContainer>
    </>
  );
};

export default page;
