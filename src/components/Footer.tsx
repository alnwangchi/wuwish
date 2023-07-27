import mainLogo from '@/assets/img/main_logo.png';
import Image from 'next/image';
import footer_fb from '@/assets/img/footer_fb.png';
import footer_ig from '@/assets/img/footer_ig.png';
import footer_line from '@/assets/img/footer_line.png';

const Footer = () => {
  return (
    <div className='bg-primary-yellow pb-5 font-cubic '>
      <div className='relative container mx-auto flex justify-center items-center'>
        <div className='text-center text-primary-dk'>
          <Image src={mainLogo} width={300} height={115} alt='神龍變裝' className='block' />
          <p>台北市漢中街150號2樓 </p>
          <p>0968-270178</p>
          <p>wu.wish88@gmail.com</p>
        </div>

        <div className='flex gap-3 absolute bottom-0 left-0'>
          <a href='/'>
            <Image src={footer_fb} width={50} height={70} alt='神龍變裝 facebook' />
          </a>
          <a href='/'>
            <Image src={footer_ig} width={50} height={70} alt='神龍變裝 instagram' />
          </a>
          <a href='/'>
            <Image src={footer_line} width={50} height={70} alt='神龍變裝 line' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
