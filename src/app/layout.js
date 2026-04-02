import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/shared/components/ui/sonner";
import CookieBanner from "@/shared/components/cookies";

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
  metadataBase: new URL("https://www.nextcv.in"),
  title: "Create an ATS Resume for Freshers – Designed for TCS, Infosys & Wipro | NextCV",
  description:
    "Free resume maker for IT freshers in India. Create ATS-friendly resumes for engineering freshers and software developer jobs in 2026 with NextCV.",
  openGraph: {
    images: ["/opengraph-image.png"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          {children}
          <CookieBanner />
          <Toaster />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Create an ATS Resume for Freshers – Designed for TCS, Infosys & Wipro | NextCV",
              url: "https://www.nextcv.in",
              description:
                "Free resume maker for IT freshers in India. Create ATS-friendly resumes for engineering freshers and software developer jobs in 2026 with NextCV.",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Create an ATS Resume for Freshers – Designed for TCS, Infosys & Wipro | NextCV",
              url: "https://www.nextcv.in",
              logo: "https://www.nextcv.in/opengraph-image.png",
              description:
                "Free resume maker for IT freshers in India. Create ATS-friendly resumes for engineering freshers and software developer jobs in 2026 with NextCV.",
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
