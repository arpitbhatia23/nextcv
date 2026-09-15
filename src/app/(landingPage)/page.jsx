import dynamic from "next/dynamic";
import { createSeoMetadata } from "@/shared/utils/seo";
import Herosection from "@/shared/components/herosection/Herosection";
import ATSFeatureSection from "@/shared/components/herosection/ATSFeatureSection";
const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));
const SEOSection = dynamic(() => import("@/shared/components/herosection/SEOSection"));
const PageContent = dynamic(() => import("@/shared/components/pageContent/PageContent"));
const HowitWork = dynamic(() => import("@/shared/components/herosection/HowitWork"));
const ProcessWorks = dynamic(() => import("@/shared/components/processWorks/ProcessWorks"));
const Testimonial = dynamic(() => import("@/shared/components/testimonial/Testimonial"));

const FAQ = dynamic(() => import("@/shared/components/herosection/FAQ"));
const SEOKeywordCloud = dynamic(() => import("@/shared/components/herosection/SEOKeywordCloud"));

export const revalidate = 3600; // Cache for 1 hour

export const metadata = createSeoMetadata({
  title: "Free Resume Builder for Freshers in India | ATS Friendly Resume Maker",
  description:
    "Use our free resume builder for freshers in India to create an ATS friendly resume, choose the right resume format, and download a professional resume template designed for Indian jobs.",
  path: "",
  keywords: [
    "resume ground",
    "resume",
    "resume maker",
    "resume format",
    "resume builder",
    "resume template",
    "canva resume",
    "ats resume checker",
    "ats friendly resume",
    "free resume builder",
    "resume maker online free",
    "resume maker free",
    "canva resume maker",
    "online resume maker free pdf",
    "free resume maker online",
    "ai resume maker",
    "ai resume builder",
    "resume maker for fresher",
    "resume maker online free download",
    "cv builder",
    "cv builder free",
    "free cv builder",
    "ai cv builder",
    "free resume builder and download",
    "resume builder free",
    "ai resume builder free",
    "resume builder online free",
    "free resume builder online",
    "best resume builder",
    "best free resume builder",
    "best resume template",
    "best resume template for fresher",
    "best resume template for freshers",
    "ats best resume template",
    "best AI resume builder for tech jobs",
    "AI resume builder with ATS optimization",
    "free AI resume builder online 2026",
  ],
});

export default function Home() {
  return (
    <>
      <Herosection />
      <ATSFeatureSection />

      <PageContent />
      <SEOSection />
      <section id="Templates">
        <Templates />
      </section>

      <HowitWork />

      <ProcessWorks />

      <FAQ />

      <Testimonial />

      <SEOKeywordCloud />
    </>
  );
}
