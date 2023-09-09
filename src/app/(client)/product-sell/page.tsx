import CategoryItem from '@/components/CategoryItem';
import { saleCategoryList } from '@/constance';
import React from 'react';
import slugify from 'slugify';
import CategoryContainer from '@/components/template/CategoryContainer';

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
