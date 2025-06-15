'use client';
import CategoryItem from '@/components/CategoryItem';
import { saleCategoryList } from '@/constance';
import React from 'react';
import slugify from 'slugify';
import CategoryContainer from '@/components/template/CategoryContainer';
// import { Metadata } from 'next';

const page = () => {
  return (
    <CategoryContainer>
      {saleCategoryList.map((c) => (
        <CategoryItem
          text={c.name}
          key={c.name}
          href={`/product-sell/${slugify(c.en, { lower: true })}`}
          alt={c.name + '按鈕'}
        />
      ))}
    </CategoryContainer>
  );
};

export default page;
