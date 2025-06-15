import './globals.css';
import './form.css';
import type { Metadata } from 'next';
import RootStyleRegistry from '@/components/RootStyleRegistry';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '神龍變裝 common title',
  description: '神龍變裝 - 讓你成為主角的服裝租借平台'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JFG2SEKK04"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JFG2SEKK04', {
                page_path: window.location.pathname,
              });
            `
          }}
        />
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
