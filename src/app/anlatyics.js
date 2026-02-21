"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only send page_view if GA is loaded
    if (pathname && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Load GA script asynchronously, non-blocking */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CT60KM1G5Z"
        strategy="afterInteractive"
      />

      {/* Initialize GA after script loads */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CT60KM1G5Z', {
            send_page_view: false // We'll manually send page_views
          });
        `}
      </Script>
    </>
  );
}
