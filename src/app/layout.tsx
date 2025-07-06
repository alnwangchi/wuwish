import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RootStyleRegistry from '@/components/RootStyleRegistry';
import Analytics from '@/ga/Analytics';
import type { Metadata } from 'next';
import './form.css';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '神龍變裝 - 台北西門變裝服裝租賃與訂製',
  description: '神龍變裝 - 讓你成為主角的服裝租借平台'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        {/*  https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=zh-tw for SEO */}
        <Script
          id="my-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ClothingStore',
              name: '神龍變裝西門町最齊全的服裝出租店',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '萬華區漢中街150號2樓',
                addressLocality: '台北市',
                postalCode: '108',
                addressCountry: 'TW'
              },
              image: 'https://www.wuwish.com.tw/logo.png',
              url: 'https://www.wuwish.com.tw/',
              telephone: '+886-968-270-178',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.041682169438786,
                longitude: 121.50667589815379
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'https://schema.org/Monday',
                    'https://schema.org/Tuesday',
                    'https://schema.org/Wednesday',
                    'https://schema.org/Thursday',
                    'https://schema.org/Friday',
                    'https://schema.org/Saturday',
                    'https://schema.org/Sunday'
                  ],
                  opens: '12:00',
                  closes: '21:00'
                }
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.9',
                reviewCount: '566'
              },
              sameAs: ['https://www.facebook.com/wuwish.tw', 'https://www.instagram.com/wuwish.tw']
            })
          }}
        ></Script>
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
