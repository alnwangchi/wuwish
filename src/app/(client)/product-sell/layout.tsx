import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '神龍變裝 - 服裝販售專區',
  description: '歡迎來到神龍變裝，這邊都是我們有在販售的服裝',
  creator: 'Allen Wang',
  alternates: {
    canonical: 'https://www.wuwish.com.tw/rent-process'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
