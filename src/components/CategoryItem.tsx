import React, { FC } from 'react';
import category_item from '@/assets/img/category_item.png';
import Image from 'next/image';
import Link from 'next/link';
import { eventTracker } from '@/ga/utils/eventTracker';

interface NavItemProps {
  href: string;
  text: string;
  alt?: string;
}

const CategoryItem: FC<NavItemProps> = ({ href, text, alt = '神龍變裝類別按鈕' }) => {
  return (
    <Link
      href={href}
      className="group relative hover:hue-rotate-[220deg]"
      onClick={(e) => {
        eventTracker('click', {
          category: text,
          label: text,
          value: 1
        });
      }}
    >
      <Image src={category_item} width={230} height={140} alt={alt} />
      <span className="absolute left-2/4 top-2/4 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center pl-9 font-cubic text-2xl text-white group-hover:text-primary-dk">
        {text}
      </span>
    </Link>
  );
};

export default CategoryItem;
