import CategoryItem from '@/components/CategoryItem';
import { tmpCategory } from '@/constance';
import React from 'react';
import slugify from 'slugify';

const page = () => {
  return (
    <div>
      <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
        {tmpCategory.map((c) => (
          <CategoryItem
            text={c.name}
            key={c.name}
            href={`/product-sale/${slugify(c.en, { lower: true })}`}
          />
        ))}
      </section>
    </div>
  );
};

export default page;
