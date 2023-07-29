import ClothesCard from '@/components/ClothesCard';
import React from 'react';

const tmp = new Array(25).fill(0);

export default async function SaleCategory({ params }: { params: { category: string } }) {
  console.log(params);
  const { category } = params;
  return (
    <div>
      <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
        {tmp.map((p) => (
          <ClothesCard href={`/product-sale/${category}/id`} key='d' />
        ))}
      </section>
    </div>
  );
}
