import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '神龍變裝 - FAQ 問與答',
  description: '歡迎來到神龍變裝的常見問題頁面，這裡解答您對租借流程、費用、試穿等常見疑問。',
  creator: 'Allen Wang'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="container space-y-8 py-10 font-cubic text-white">{children}</div>;
}
