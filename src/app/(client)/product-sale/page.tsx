import CategoryItem from '@/components/CategoryItem';
import { categoryList } from '@/constance';
import React from 'react';
import slugify from 'slugify';
import CategoryContainer from '@/components/template/CategoryContainer';

const page = () => {
  return (
    <CategoryContainer>
      {categoryList.map((c) => (
        <CategoryItem
          text={c.name}
          key={c.name}
          href={`/product-sale/${slugify(c.en, { lower: true })}`}
        />
      ))}
    </CategoryContainer>
  );
};

export default page;
