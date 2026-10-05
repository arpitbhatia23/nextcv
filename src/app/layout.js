import { Geist } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/shared/components/cookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),

  title: {
    default: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools ",
  },
  description:
    "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",

  alternates: {
    canonical: "https://www.nextcv.in/",
  },
  openGraph: {
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextCV ATS resume builder",
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}  antialiased`}>
        <main className="">
          {children}
          <CookieBanner />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools",
              url: "https://www.nextcv.in",
              description:
                "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NextCV",
              url: "https://www.nextcv.in",
              logo: "https://www.nextcv.in/opengraph-image.png",
              description: "Online ATS resume builder for Indian freshers.",
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
      </body>
    </html>
  );
}
