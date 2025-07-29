'use client';
import mainLogo from '@/assets/img/main_logo.png';

import Image from 'next/image';
import footer_fb from '@/assets/img/footer_fb.png';
import footer_ig from '@/assets/img/footer_ig.png';
import footer_line from '@/assets/img/footer_line.png';
import footer_comment from '@/assets/img/footer_comment.png';
import Link from 'next/link';
import { eventTracker } from '@/ga/utils/eventTracker';
import NavItem from './NavItem';
// import { TawkLauncher } from '@/twak';

const Footer = () => {
  return (
    <div className="bg-primary-yellow pb-5 font-cubic">
      <div className="container relative flex flex-col items-center justify-center gap-3 lg:flex-row">
        <div className="text-center text-primary-dk">
          <Link href="/" className="z-20 block h-fit">
            <Image
              src={mainLogo}
              layout="responsive"
              sizes="(max-width: 400px) 200px,
              300px"
              alt="神龍變裝"
              className="block"
            />
          </Link>
          {/* <TawkLauncher /> */}
          <p>台北市漢中街150號2樓 </p>
          <p>0968-270178</p>
          <p>wu.wish88@gmail.com</p>
        </div>

        <div className="flex gap-3 lg:absolute lg:bottom-0 lg:left-0">
          <a
            target="_blank"
            href="https://www.facebook.com/Wu.wish88"
            onClick={() => {
              eventTracker('social_media', {
                event_category: 'footer_social',
                event_label: 'FB',
                value: 1
              });
            }}
          >
            <Image src={footer_fb} width={75} height={105} alt="神龍變裝 facebook" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/wu_wish88/"
            onClick={() => {
              eventTracker('social_media', {
                event_category: 'footer_social',
                event_label: 'IG',
                value: 1
              });
            }}
          >
            <Image src={footer_ig} width={75} height={105} alt="神龍變裝 instagram" />
          </a>
          <a
            target="_blank"
            href="https://lin.ee/w3FAybm"
            onClick={() => {
              eventTracker('social_media', {
                event_category: 'footer_social',
                event_label: 'LINE',
                value: 1
              });
            }}
          >
            <Image src={footer_line} width={75} height={105} alt="神龍變裝 line" />
          </a>
          <a target="_blank" href="https://reurl.cc/gD9mK4">
            <Image src={footer_comment} width={75} height={105} alt="神龍變裝 評論" />
          </a>
        </div>

        <div className="flex gap-3 lg:absolute lg:bottom-4 lg:right-0">
          <NavItem text="租借流程" href="/rent-process" />
          <NavItem text="常見問題" href="/faq" />
          <NavItem text="關於我們" href="/about" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
