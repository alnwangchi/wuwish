// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center text-white">
      <div className="max-w-md space-y-3">
        <h1 className="text-5xl font-extrabold ">404</h1>
        <h2 className="text-2xl font-semibold">頁面不存在</h2>
        <p className="text-sm">很抱歉，我們找不到您要前往的頁面。請確認網址是否正確。</p>
        <Link
          href="/"
          className="inline-block rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          回到首頁
        </Link>
      </div>
    </div>
  );
}
