import React, { FC } from 'react';
import navItem_bg from '@/assets/img/navItem_bg.png';
import ball_icon from '@/assets/img/ball_icon.png';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  text: string;
  alt?: string;
}

const NavItem: FC<NavItemProps> = ({ text, alt }) => {
  return (
    <Link href='/' className='relative'>
      <Image src={navItem_bg} width={150} height={60} alt='TBC' />
      <div className='absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 font-bold text-lg w-full flex justify-center'>
        <Image src={ball_icon} width={30} height={30} alt='TBC' />
        <span className='pr-2'>{text}</span>
      </div>
    </Link>
  );
};

export default NavItem;
