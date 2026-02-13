import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authprovider";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "./anlatyics";
import { Suspense } from "react";
import Loading from "./loading";

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

// export const metadata = {
//   title: "NextCV | AI Resume Builder for ATS-Friendly CVs in India",
//   description:
//     "NextCV is an AI resume builder that creates ATS-friendly resumes recruiters scan in seconds, optimized for the Indian job market and 2026 jobs.",
//   keywords: [
//     "ats friendly resume builder india",
//     "ai resume builder india",
//     "resume builder india free",
//     "cv maker india online",
//     "best resume format 2026 india",
//     "resume for freshers india",
//     "ats friendly resume format 2026",
//     "professional resume india",
//     "job application resume india",
//     "online resume builder india",
//     "resume templates india",
//     "latest resume format india",
//   ],
//   authors: [{ name: "NextCV" }],
//   robots: "index, follow",

//   // ⚡ Fix for Open Graph / Twitter images
//   metadataBase: new URL("https://www.nextcv.in"), // replace with your production URL
//   openGraph: {
//     title: "NextCV | AI Resume Builder for ATS-Friendly CVs in India",
//     description:
//       "NextCV is an AI resume builder that creates ATS-friendly resumes recruiters scan in seconds, optimized for the Indian job market and 2026 jobs.",
//     url: "/", // optional, relative to metadataBase
//     type: "website",
//     images: ["/opengraph-image.png"], // relative path will resolve correctly
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "NextCV | AI Resume Builder for ATS-Friendly CVs in India",
//     description:
//       "NextCV is an AI resume builder that creates ATS-friendly resumes recruiters scan in seconds, optimized for the Indian job market and 2026 jobs.",
//     images: ["/opengraph-image.png"], // relative path
//   },
//   alternates: {
//     canonical: "https://www.nextcv.in", // Sets the canonical URL
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning="true" data-qb-installed="true">
      <head>
        {/* JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NextCV | AI Resume Builder for ATS-Friendly CVs in India",
              url: "https://nextcv.in",
              description:
                "NextCV is an AI resume builder that creates ATS-friendly resumes recruiters scan in seconds, optimized for the Indian job market and 2026 jobs.",
            }),
          }}
        />

        {/* JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NextCV | AI Resume Builder for ATS-Friendly CVs in India",
              url: "https://www.nextcv.in",
              logo: "https://www.nextcv.in/opengraph-image.png",
              description:
                "NextCV is an AI resume builder that creates ATS-friendly resumes recruiters scan in seconds, optimized for the Indian job market and 2026 jobs.",
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
              {children}
              <GoogleAnalytics />
            </Suspense>
            <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
