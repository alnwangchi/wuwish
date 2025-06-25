import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RootStyleRegistry from '@/components/RootStyleRegistry';
import Analytics from '@/ga/Analytics';
import type { Metadata } from 'next';
import './form.css';
import './globals.css';

// export const metadata: Metadata = {
//   title: '神龍變裝 - 服裝租借平台',
//   description: '神龍變裝 - 讓你成為主角的服裝租借平台'
// };

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
