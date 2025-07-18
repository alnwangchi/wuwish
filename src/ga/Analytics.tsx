'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JFG2SEKK04"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JFG2SEKK04', {
                page_path: window.location.pathname,
              });
            `
        }}
      />
    </>
  );
}
