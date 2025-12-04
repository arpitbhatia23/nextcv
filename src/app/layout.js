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

export const metadata = {
  title: "NextCV - AI Resume Builder",
  description:
    "Create your resume with AI in minutes. Just ₹100 per resume, no subscriptions.",
  keywords: [
    "resume builder",
    "CV maker",
    "AI resume",
    "job application",
    "professional resume",
    "friendly",
    "minutes",
    "templates",
    "format",
  ],
  authors: [{ name: "NextCV" }],
  robots: "index, follow",

  // ⚡ Fix for Open Graph / Twitter images
  metadataBase: new URL("https://nextcv.in"), // replace with your production URL
  openGraph: {
    title: "NextCV – Professional ATS Resume Builder for India",
    description:
      "Create a professional, ATS-optimized resume in minutes. Built for the Indian job market. Try the free demo and get your AI resume for just ₹100—no subscription.",
    url: "/", // optional, relative to metadataBase
    type: "website",
    images: ["/opengraph-image.png"], // relative path will resolve correctly
  },
  twitter: {
    card: "summary_large_image",
    title: "NextCV - Build the Perfect ATS Friendly Resume with AI in Minutes",
    description:
      "Our AI-powered platform is optimized specifically for the Indian job market. Try the free demo today and get your professional, ATS-optimized resume for just ₹100. No subscriptions.",
    images: ["/opengraph-image.png"], // relative path
  },
  alternates: {
    canonical: "https://nextcv.in/", // Sets the canonical URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NextCV",
              url: "https://nextcv.in",
              description:
                "Create professional ATS-optimized resumes in minutes. Built for the Indian job market with a simple ₹100 one-time pricing.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://nextcv.in/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
              name: "NextCV",
              url: "https://nextcv.in",
              logo: "https://nextcv.in/logo.png",
            }),
          }}
        />

        {/* JSON-LD for WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "NextCV - Build the Perfect ATS Friendly Resume",
              url: "https://nextcv.in/",
              description:
                "Create ATS-ready professional resumes tailored for the Indian job market. Try the free demo and download your resume for ₹100.",
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
          <GoogleAnalytics />
        </AuthProvider>
      </body>
    </html>
  );
}
