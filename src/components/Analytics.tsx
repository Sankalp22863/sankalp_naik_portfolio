'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// move GA_ID to module scope so it's stable across renders / HMR
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function Analytics() {
  const pathname = usePathname();

  // keep dependency array stable (same length every render)
  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_ID, { page_path: pathname });
    }
  }, [pathname]); // stable length: 1

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}