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

const Header = () => {
  const pathname = usePathname();
  const isAdmin =
    pathname.startsWith('/dashboard') || pathname.startsWith('/login');

  return isAdmin ? (
    <div className='bg-primary-yellow py-3'>
      <div className='container mx-auto flex justify-between'>
        <Link href='/'>
          <Image src={main_logo} width={300} height={115} alt='神龍變裝' />
        </Link>
        <section className='flex flex-col justify-center px-10'>
          <div className='flex items-center'>
            <nav className='flex gap-2'>
              <NavItem text='商品上傳' href='/dashboard/upload' />
              <NavItem text='商品列表' href='/dashboard/list' />
            </nav>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className='bg-primary-yellow py-3'>
      <div className='container mx-auto flex justify-center gap-[10%]'>
        <Link href='/'>
          <Image src={main_logo} width={300} height={115} alt='神龍變裝' />
        </Link>
        <section className='flex flex-col justify-center px-10'>
          <div className='pl-2 flex gap-2 text-black text-4xl cursor-pointer'>
            <a href=''>
              <FaSquareFacebook />
            </a>
            <a href=''>
              <FaInstagram />
            </a>
            <a className='f-center' href=''>
              <Image src={icon_line} width={32} height={32} alt='line' />
            </a>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex'>
              <Image
                className=''
                src={search_icon}
                width={39}
                height={42}
                alt='line'
              />
              <input
                type='text'
                className='font-cubic p-2 focus:outline-none placeholder:font-cubic'
                placeholder='輸入文字 搜尋服裝'
              />
            </div>
            <nav className='flex gap-2'>
              <NavItem text='商品販售' href='/product-sale' />
              <NavItem text='租借流程' href='/rental-process' />
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Header;
