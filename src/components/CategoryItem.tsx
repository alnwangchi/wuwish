import React, { FC } from 'react';
import category_item from '@/assets/img/category_item.png';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  text: string;
  alt?: string;
}

const CategoryItem: FC<NavItemProps> = ({ href, text, alt }) => {
  return (
    <Link href={href} className="relative group hover:hue-rotate-[220deg]">
      <Image src={category_item} width={230} height={140} alt="TBC" />
      <span className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-full flex justify-center pl-9 font-cubic text-2xl group-hover:text-primary-dk text-white">
        {text}
      </span>
    </Link>
  );
};

export default CategoryItem;
