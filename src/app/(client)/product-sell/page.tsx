import CategoryItem from '@/components/CategoryItem';
import { saleCategoryList } from '@/constance';
import React from 'react';
import slugify from 'slugify';
import CategoryContainer from '@/components/template/CategoryContainer';
import { Metadata } from 'next';
import { Descriptions } from 'antd';

export const metadata: Metadata = {
  title: '神龍服裝販售',
  description: `神龍服裝販售區，如果想購買的神龍服裝就來這邊找吧! 現在有${saleCategoryList
    .map((c) => c.name)
    .join(',')}這些可以選擇哦`
};
const page = () => {
  return (
    <CategoryContainer>
      {saleCategoryList.map((c) => (
        <CategoryItem
          text={c.name}
          key={c.name}
          href={`/product-sell/${slugify(c.en, { lower: true })}`}
        />
      ))}
    </CategoryContainer>
  );
};

export default page;
