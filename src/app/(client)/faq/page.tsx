import ball_icon from '@/assets/img/ball_icon.png';
import { FAQ } from '@/constance/faq';
import { FAQJsonLd } from '@/seo/json-ld';
import { Divider } from 'antd';
import Image from 'next/image';

const FAQPage = () => {
  return (
    <>
      <FAQJsonLd />
      <h1 className="mb-4 text-center">FAQ 常見問題</h1>
      {FAQ.map((faq) => (
        <section className="space-y-4 leading-loose" key={faq.category}>
          <h2 className="title-effect mx-auto inline-block text-center shadow">{faq.category}</h2>
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
