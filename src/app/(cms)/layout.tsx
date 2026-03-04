import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '管理後台',
  robots: {
    index: false,
    follow: false,
    nocache: true
  },
  // 覆蓋父層 SEO 設定，避免任何搜尋引擎索引
  description: '',
  openGraph: {},
  twitter: {},
  alternates: {}
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
