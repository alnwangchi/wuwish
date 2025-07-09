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
        priority
        src={yellow}
        width={84} // 原本 129 * 0.65
        height={39} // 原本 60 * 0.65
        alt="連結按鈕"
        className="ab-center opacity-0 transition group-hover:opacity-100"
      />
      <Image
        priority
        src={navItem_bg}
        width={98} // 原本 150 * 0.65
        height={39} // 原本 60 * 0.65
        alt="連結按鈕"
      />
      <div className="ab-center flex w-full justify-center text-sm font-bold">
        <Image
          priority
          src={ball_icon}
          width={20} // 原本 30 * 0.65
          height={20} // 原本 30 * 0.65
          alt="連結按鈕"
        />
        <span className="pr-2">{text}</span>
      </div>
    </Link>
  );
};

export default NavItem;
