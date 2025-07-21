'use client';

import { useState } from 'react';
declare global {
  interface Window {
    Tawk_API?: {
      showWidget?: () => void;
    };
    Tawk_LoadStart?: any;
  }
}
export const TawkLauncher = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTawk = () => {
    if (isLoaded) {
      window.Tawk_API?.showWidget?.();
      return;
    }

    // 設定全域變數
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 動態建立 script
    const s1 = document.createElement('script');
    s1.src = 'https://embed.tawk.to/687e4ae76d5d401916744603/1j0ml95v1';
    s1.async = true;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);

    setIsLoaded(true);
  };

  return (
    <button onDoubleClick={loadTawk} className="cursor-pointer py-1 leading-none opacity-0">
      開啟客服聊天室
    </button>
  );
};
