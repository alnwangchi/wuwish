import ClothesCard from '@/components/ClothesCard';
import React from 'react';

const tmp = new Array(25).fill(0);

export default async function RentalCategory({ params }: { params: { category: string } }) {
  console.log(params);
  const { category } = params;
  return (
    <section className='container mx-auto py-10 grid grid-cols-5 gap-5 place-items-center'>
      {tmp.map((p) => (
        <ClothesCard href={`/product-rental/${category}/id`} key='d' />
      ))}
    </section>
  );
}
