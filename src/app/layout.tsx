import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RootStyleRegistry from '@/components/RootStyleRegistry';
import Analytics from '@/ga/Analytics';
import type { Metadata } from 'next';
import './form.css';
import './globals.css';

export const metadata: Metadata = {
  title: '神龍變裝 - 台北西門租衣服推薦｜角色扮演・主題派對服裝出租｜神龍變裝',
  description:
    '神龍變裝位於台北西門町，專業提供各類租衣服服務，包含動漫電影、角色扮演、異國主題與派對造型，超過千款以上服裝任你挑選，高品質大配租借流程快速，歡迎來店詢問！',
  alternates: {
    canonical: 'https://wuwish.com.tw',
    languages: {
      'zh-TW': 'https://wuwish.com.tw'
    }
  },
  openGraph: {
    title: '神龍變裝 服裝出租｜台北西門町服裝租借服務',
    description: '多樣風格、主題服裝出租，滿足派對、拍攝、變裝需求！',
    url: 'https://www.wuwish.com.tw',
    siteName: '神龍變裝 服裝出租',
    images: [
      {
        url: 'https://www.wuwish.com.tw/og.png', // 請換成實際圖片 URL
        width: 1200,
        height: 630,
        alt: '神龍變裝 服裝出租 - OG 封面圖'
      }
    ],
    locale: 'zh_TW',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '', // 換成你的 Twitter 帳號
    title: '神龍變裝 服裝出租｜台北西門町服裝租借服務',
    description: '在台北西門町找到最適合你的服裝租借服務，多樣風格、線上預約超方便！',
    images: ['https://www.wuwish.com.tw/og.png'] // 同樣換成正確圖片
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body>
        <RootStyleRegistry>
          <Header />
          {/* minus Header and Footer */}
          <div className="min-h-[calc(100vh-340px)]">{children}</div>
          <Footer />
        </RootStyleRegistry>
      </body>
    </html>
  );
}
