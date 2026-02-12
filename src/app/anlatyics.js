"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag("config", "G-CT60KM1G5Z", {
        page_path: pathname,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/googletagmanager.com/gtag/js?id=G-CT60KM1G5Z"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CT60KM1G5Z');
        `}
      </Script>
    </>
  );
}
