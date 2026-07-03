import Nav from "@/shared/components/ui/navbar";
import { Footer } from "@/shared/components/footer/Footer";

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  applicationName: "NextCV",
  title: "Free ATS Resume Builder for Indian Freshers 2026 | NextCV",
  description:
    "Create an ATS-friendly resume for Indian fresher jobs in minutes. Choose templates for TCS, Infosys, Wipro and more. Start free, download from ₹49.",
  authors: [{ name: "NextCV" }],
  creator: "NextCV",
  publisher: "NextCV",
  robots: "index, follow",
  keywords: [
    "ats friendly resume builder india",
    "ai resume builder india",
    "resume builder india free",
    "online resume builder india",
    "resume templates india",
    "latest resume format india",
    "best AI resume builder for tech jobs",
    "AI resume builder with ATS optimization",
    "free AI resume builder online 2026",
    "AI resume builder that auto-saves resumes",
    "AI resume builder for creative industries",
    "AI resume builder with AI-generated summaries",
    "AI resume builder for high-demand tech roles",
    "AI resume builder with drag-and-drop editor",
    "AI resume builder for senior developers",
    "AI-powered resume builder for Indian fresh graduates 2026",
    "tcs resume builder",
    "techncv.com",
    "nest cv",
    "next gen cv",
    "indian ats friendly resume",
    "accenture infographic resume builder",
    "ltimindtree resume format",
    "ats resume india",
    "best ats friendly resume builder india",
    "resume builder for campus placement",
  ],
  openGraph: {
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aurpitaurpit",
  },
};
export default function LandingLayout({ children }) {
  return (
    <>
      <section className={`antialiased`}>
        {/* JSON-LD for LocalBusiness/SoftwareApplication */}

        <Nav />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Free ATS Resume Builder for Indian Freshers 2026 | NextCV",
              operatingSystem: "Web",
              description:
                "Create an ATS-friendly resume for Indian fresher jobs in minutes. Choose templates for TCS, Infosys, Wipro and more. Start free, download from ₹49.",
              applicationCategory: "Productivity",
              url: "https://www.nextcv.in",
              screenshot: "https://www.nextcv.in/opengraph-image.png",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "250",
              },
              offers: {
                "@type": "Offer",
                price: "100",
                priceCurrency: "INR",
                description: "One-time fee for AI resume generation",
              },
            }),
          }}
        />
      </section>
    </>
  );
}
