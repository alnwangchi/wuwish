'use client';
import icon_line from '@/assets/img/icon_line.png';
import main_logo from '@/assets/img/main_logo.png';
import search_icon from '@/assets/img/search_icon.png';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FaInstagram, FaSquareFacebook } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';
import NavItem from './NavItem';
import { eventTracker } from '@/ga/utils/eventTracker';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/login');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (keyword: string | undefined) => {
    if (!!keyword && !!keyword.trim()) {
      router.push(`/search?keyword=${keyword}`);
      setIsMenuOpen?.(false);
    }
  };

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const keyword = target.value;
    eventTracker('search', {
      event_category: 'product_search',
      event_label: keyword,
      value: 1
    });
    handleSearch(keyword);
  };

  const onClick = () => {
    const keyword = inputRef.current?.input?.value;
    handleSearch(keyword);
  };

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
                <NavItem text="輪播管理" href="/dashboard/banner" />
              </nav>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-primary-yellow py-3">
      <div className="container relative flex justify-center sm:justify-between lg:gap-[10%]">
        <Link href="/" className="z-20">
          <Image
            src={main_logo}
            alt="神龍變裝"
            layout="responsive"
            sizes="(max-width: 400px) 200px,
              300px"
            priority
          />
        </Link>
        <section className="hidden sm:flex-col sm:justify-center md:flex lg:px-2">
          <div className="mb-2 flex cursor-pointer gap-2 pl-2 text-4xl text-black">
            <a
              target="_blank"
              href="https://www.facebook.com/Wu.wish88"
              aria-label="Facebook"
              onClick={() => {
                eventTracker('social_media', {
                  event_category: 'header_social',
                  event_label: 'FB',
                  value: 1
                });
              }}
            >
              <FaSquareFacebook />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/wu_wish88/"
              aria-label="Instagram"
              onClick={() => {
                eventTracker('social_media', {
                  event_category: 'header_social',
                  event_label: 'IG',
                  value: 1
                });
              }}
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              className="f-center"
              href="https://lin.ee/w3FAybm"
              aria-label="LINE"
              onClick={() => {
                eventTracker('social_media', {
                  event_category: 'header_social',
                  event_label: 'LINE',
                  value: 1
                });
              }}
            >
              <Image src={icon_line} width={32} height={32} alt="line" priority />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex">
              <div className="relative">
                <Input
                  className="rounded-none p-2 !font-cubic placeholder:font-cubic placeholder:text-xs"
                  styles={{}}
                  placeholder="輸入文字 搜尋服裝"
                  onPressEnter={onSearch}
                  ref={inputRef}
                />
                <span onClick={onClick} className="absolute right-0 top-1/2 -translate-y-1/2 p-1">
                  <Image
                    className="cursor-pointer"
                    src={search_icon}
                    width={25}
                    height={25}
                    alt="line"
                    priority
                    aria-label="搜尋服裝"
                  />
                </span>
              </div>
            </div>
            <nav className="flex gap-2">
              <NavItem text="租借流程" href="/rent-process" />
              <NavItem text="常見問題" href="/faq" />
              <NavItem text="關於我們" href="/about" />
            </nav>
          </div>
        </section>
        <FaSearch
          className="absolute right-5 top-2/4 z-20 -translate-y-1/2 cursor-pointer text-xl md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        <section
          className={clsx(
            'absolute z-10 w-screen bg-primary-yellow py-5 transition-all duration-500',
            isMenuOpen && 'top-[80px] sm:top-[112px]',
            !isMenuOpen && '-top-[240px]'
          )}
        >
          <nav className="flex flex-col  items-center gap-2 px-5">
            <div className="relative w-full">
              <Input
                className="rounded-none p-2 !font-cubic placeholder:font-cubic"
                styles={{}}
                placeholder="輸入文字 搜尋服裝"
                onPressEnter={onSearch}
                ref={inputRef}
              />
              <span onClick={onClick} className="absolute right-0 top-1/2 -translate-y-1/2 p-1">
                <Image
                  className="cursor-pointer"
                  src={search_icon}
                  width={25}
                  height={25}
                  alt="line"
                  priority
                />
              </span>
            </div>
            <NavItem text="租借流程" href="/rent-process" setIsMenuOpen={setIsMenuOpen} />
            <NavItem text="常見問題" href="/faq" setIsMenuOpen={setIsMenuOpen} />
            <NavItem text="關於我們" href="/about" />
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Header;
