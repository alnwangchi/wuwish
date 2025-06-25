'use client';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const eventTracker = (
  eventName: string, // 這個事件定義的名稱 一律用下底線 main GA identifier
  {
    event_category, // 事件分類
    event_label, // 事件標籤 詳細描述
    value // 數值
  }: {
    event_category?: string;
    event_label?: string;
    value?: number;
  } = {}
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // event 是固定的 告訴 gtag 你要發送一個事件
    window.gtag('event', eventName, {
      event_category,
      event_label,
      value
    });
  } else {
    console.warn('gtag is not available');
  }
};
