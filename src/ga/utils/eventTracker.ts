'use client';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const eventTracker = (
  eventName: string, // 事件名稱
  {
    event_category, // 分類
    event_label, // 細部標記
    value // 數值
  }: {
    event_category?: string;
    event_label?: string;
    value?: number;
  } = {}
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category,
      event_label,
      value
    });
  } else {
    console.warn('gtag is not available');
  }
};
