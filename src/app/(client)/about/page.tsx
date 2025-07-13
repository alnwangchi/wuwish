import { ABOUT } from '@/constance/about';
import { AboutJsonLd } from '@/seo/json-ld';

const AboutPage = () => {
  return (
    <>
      <AboutJsonLd />
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
