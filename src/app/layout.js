import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authprovider";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "./anlatyics";
import { Suspense } from "react";
import Loading from "./loading";
import { domAnimation, LazyMotion } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
              url: "https://www.nextcv.in",
              description:
                "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly.",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Free AI Resume Builder for India – ATS Friendly in 60 Seconds | NextCV",
              url: "https://www.nextcv.in",
              logo: "https://www.nextcv.in/opengraph-image.png",
              description:
                "Create a professional ATS-friendly resume in under 1 minute. Built for Indian job seekers. No subscriptions. Pay once and download instantly.",
              sameAs: [
                "https://www.facebook.com/nextcv",
                "https://www.twitter.com/nextcv",
                "https://www.linkedin.com/company/next-cv",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "help@nextcv.in",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main>
            <Suspense fallback={<Loading />}>
              <LazyMotion features={domAnimation}>{children}</LazyMotion>
              <GoogleAnalytics />
            </Suspense>
            <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
