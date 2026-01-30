import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata = {
  title: "NextCV – Professional ATS Resume Builder for India",
  description:
    "Create a professional, ATS-optimized resume in minutes. Built for the Indian job market. Try the free demo and get your AI resume for just ₹100—no subscription.",
};

export default function RootLayout({ children }) {
  return (
    <section className={`antialiased`}>
      {/* JSON-LD for LocalBusiness/SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "NextCV - AI Resume Builder",
            description:
              "Create professional ATS-optimized resumes tailored for the Indian job market",
            applicationCategory: "Productivity",
            url: "https://www.nextcv.in",
            screenshot: "https://www.nextcv.in/opengraph-image.webp",
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

      {/* JSON-LD for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is NextCV?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NextCV is an AI-powered resume builder designed specifically for the Indian job market. Create professional, ATS-optimized resumes in just minutes.",
                },
              },
              {
                "@type": "Question",
                name: "How much does it cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NextCV costs just ₹100 per resume with no subscriptions or hidden fees. Try our free demo first!",
                },
              },
              {
                "@type": "Question",
                name: "Is NextCV ATS-friendly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! All resumes created with NextCV are optimized to pass Applicant Tracking Systems (ATS) used by most recruiters.",
                },
              },
            ],
          }),
        }}
      />
      <Nav />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
