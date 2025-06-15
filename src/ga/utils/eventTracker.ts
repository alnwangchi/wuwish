'use client';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const eventTracker = (
  eventName: string, // 事件名稱
  {
    category, // 分類
    label, // 細部標記
    value // 數值
  }: {
    category?: string;
    label?: string;
    value?: number;
  } = {}
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value
    });
  } else {
    console.warn('gtag is not available');
  }
};
