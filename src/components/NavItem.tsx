import React, { FC } from 'react';
import navItem_bg from '@/assets/img/navItem_bg.png';
import ball_icon from '@/assets/img/ball_icon.png';
import yellow from '@/assets/img/yellow.svg';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  text: string;
  alt?: string;
}

const NavItem: FC<NavItemProps> = ({ href, text, alt }) => {
  return (
    <Link href={href} className='relative group'>
      <Image
        src={yellow}
        width={129}
        height={60}
        alt='TBC'
        className='ab-center opacity-0 group-hover:opacity-100 transition'
      />
      <Image src={navItem_bg} width={150} height={60} alt='TBC' />
      <div className='ab-center font-bold text-lg w-full flex justify-center'>
        <Image src={ball_icon} width={30} height={30} alt='TBC' />
        <span className='pr-2'>{text}</span>
      </div>
    </Link>
  );
};

export default NavItem;
