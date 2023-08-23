'use client';
import main_logo from '@/assets/img/main_logo.png';
import icon_line from '@/assets/img/icon_line.png';
import search_icon from '@/assets/img/search_icon.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaSquareFacebook } from 'react-icons/fa6';
import NavItem from './NavItem';
import { usePathname } from 'next/navigation';
import useAuthenticate from '@/hooks/useAuthenticate';
import { useState } from 'react';
import clsx from 'clsx';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/login');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isAdmin) {
    return (
      <div className="bg-primary-yellow py-3">
        <div className="container flex justify-between">
          <Link href="/">
            <Image src={main_logo} width={300} height={115} alt="神龍變裝" />
          </Link>
          <section className="flex flex-col justify-center lg:px-2">
            <div className="flex items-center">
              <nav className="flex gap-2">
                <NavItem text="商品上傳" href="/dashboard/upload" />
                <NavItem text="商品列表" href="/dashboard/list" />
              </nav>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-primary-yellow py-3 z-10">
      <div className="relative container flex justify-center lg:gap-[10%]">
        <Link href="/" className="z-20">
          <Image
            src={main_logo}
            alt="神龍變裝"
            layout="responsive"
            sizes="(max-width: 400px) 200px,
              300px"
          />
        </Link>
        <section className="hidden md:flex sm:flex-col sm:justify-center lg:px-2">
          <div className="pl-2 flex gap-2 text-black text-4xl cursor-pointer">
            <a href="">
              <FaSquareFacebook />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a className="f-center" href="">
              <Image src={icon_line} width={32} height={32} alt="line" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex">
              <Image className="" src={search_icon} width={39} height={42} alt="line" />
              <input
                type="text"
                className="font-cubic p-2 focus:outline-none placeholder:font-cubic"
                placeholder="輸入文字 搜尋服裝"
              />
            </div>
            <nav className="flex gap-2">
              <NavItem text="商品販售" href="/product-sale" />
              <NavItem text="租借流程" href="/rental-process" />
            </nav>
          </div>
        </section>
        <GiHamburgerMenu
          className="md:hidden absolute text-xl right-5 top-2/4 -translate-y-1/2 cursor-pointer z-20"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        <section
          className={clsx(
            'absolute py-5 bg-primary-yellow z-10 w-full transition-all duration-500',
            isMenuOpen && 'top-[80px]',
            !isMenuOpen && '-top-[240px]'
          )}
        >
          <nav className="flex flex-col  items-center gap-2">
            <NavItem text="商品販售" href="/product-sale" />
            <NavItem text="租借流程" href="/rental-process" />
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Header;
