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
              logo: "https://nextcv.in/opengraph-image.png",
              description:
                "AI-powered resume builder optimized for the Indian job market",
              sameAs: [
                "https://www.facebook.com/nextcv",
                "https://www.twitter.com/nextcv",
                "https://www.linkedin.com/company/nextcv",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "support@nextcv.in",
              },
            }),
          }}
        />

        {/* JSON-LD for BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://nextcv.in",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Dashboard",
                  item: "https://nextcv.in/dashboard",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Blogs",
                  item: "https://nextcv.in/blogs",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "About",
                  item: "https://nextcv.in/about-us",
                },
              ],
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
