'use client';
import './globals.css';
import './form.css';
// import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <div style={{ minHeight: `calc(100vh - 127px - 204px)` }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
