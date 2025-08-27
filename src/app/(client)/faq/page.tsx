import ball_icon from '@/assets/img/ball_icon.png';
import { FAQ } from '@/constance/faq';
import { FAQJsonLd } from '@/seo/json-ld';
import { Divider } from 'antd';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/seo/json-ld';

const FAQPage = () => {
  const breadcrumbItems = [
    {
      title: (
        <a className="breadcrumb" href="/">
          首頁
        </a>
      )
    },
    {
      title: <span className="text-white">常見問題</span>
    }
  ];

  // 為 SEO 準備麵包屑資料
  const breadcrumbSeoItems = [
    { name: '首頁', url: 'https://www.wuwish.com.tw/' },
    { name: '常見問題', url: 'https://www.wuwish.com.tw/faq' }
  ];

  return (
    <>
      <FAQJsonLd />
      <BreadcrumbJsonLd items={breadcrumbSeoItems} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="mb-4 text-center">FAQ 常見問題</h1>
      {FAQ.map((faq, idx) => (
        <section className="space-y-4 text-justify leading-loose" key={idx}>
          <div className="flex items-center gap-2">
            {faq.icon}
            <h2 className="title-effect inline-block text-center shadow">{faq.category}</h2>
          </div>
          {faq.items.map((item, idx, ary) => (
            <div className="space-y-2" key={idx}>
              <div className="flex items-center">
                <Image src={ball_icon} width={30} height={30} alt="FAQ-icon" />
                <h3>{item.question}</h3>
              </div>
              <div className="text-md">{item.answer}</div>
              {idx !== ary.length - 1 && <Divider style={{ background: 'white' }} />}
            </div>
          ))}
        </section>
      ))}
    </>
  );
};

export default FAQPage;
