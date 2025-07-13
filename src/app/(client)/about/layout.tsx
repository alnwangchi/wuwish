import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '神龍變裝 - 關於神龍變裝',
  description: '歡迎來到神龍變裝的關於我，這裡是我們的故事、服務與團隊介紹。',

  creator: 'Allen Wang'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-[60%] space-y-8 py-10 font-cubic text-white">{children}</div>
  );
}
