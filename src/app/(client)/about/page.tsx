import { ABOUT } from '@/constance/about';
import { AboutJsonLd } from '@/seo/json-ld';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/seo/json-ld';

const AboutPage = () => {
  const breadcrumbItems = [
    {
      title: (
        <a className="breadcrumb" href="/">
          首頁
        </a>
      )
    },
    {
      title: <span className="text-white">關於我們</span>
    }
  ];

  // 為 SEO 準備麵包屑資料
  const breadcrumbSeoItems = [
    { name: '首頁', url: 'https://www.wuwish.com.tw/' },
    { name: '關於我們', url: 'https://www.wuwish.com.tw/about' }
  ];

  return (
    <>
      <AboutJsonLd />
      <BreadcrumbJsonLd items={breadcrumbSeoItems} />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="mb-4 text-center">關於神龍變裝｜西門町服裝道具租借專家</h1>
      {ABOUT.map(({ title, content }) => (
        <section key={title} className="mb-8">
          <h2 className="mb-2 text-xl font-bold">{title}</h2>
          <div className="text-base">{content}</div>
        </section>
      ))}
    </>
  );
};

export default AboutPage;
