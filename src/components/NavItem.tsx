import React, { Dispatch, FC, SetStateAction } from 'react';
import navItem_bg from '@/assets/img/navItem_bg.png';
import ball_icon from '@/assets/img/ball_icon.png';
import yellow from '@/assets/img/yellow.svg';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  text: string;
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
  alt?: string;
}

const NavItem: FC<NavItemProps> = ({ href, text, alt, setIsMenuOpen }) => {
  return (
    <Link href={href} className="group relative w-fit" onClick={() => setIsMenuOpen?.(false)}>
      <Image
        src={yellow}
        width={129}
        height={60}
        alt="TBC"
        className="ab-center opacity-0 transition group-hover:opacity-100"
      />
      <Image src={navItem_bg} width={150} height={60} alt="TBC" />
      <div className="ab-center flex w-full justify-center text-lg font-bold">
        <Image src={ball_icon} width={30} height={30} alt="TBC" />
        <span className="pr-2">{text}</span>
      </div>
    </Link>
  );
};

export default NavItem;
