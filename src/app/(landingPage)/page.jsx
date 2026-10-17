import { createSeoMetadata } from "@/shared/utils/seo";
import LandingHero from "@/shared/components/landing/LandingHero";
import WorkflowSection from "@/shared/components/landing/WorkflowSection";
import ATSKeywordSection from "@/shared/components/landing/ATSKeywordSection";
import AIWritingSection from "@/shared/components/landing/AIWritingSection";
import TemplatesSection from "@/shared/components/landing/TemplatesSection";
import ShareProfileSection from "@/shared/components/landing/ShareProfileSection";
import CoverLetterSection from "@/shared/components/landing/CoverLetterSection";
import PricingSection from "@/shared/components/landing/PricingSection";
import FAQSection from "@/shared/components/landing/FAQSection";
import LandingFinalCTA from "@/shared/components/landing/LandingFinalCTA";

export const revalidate = 3600; // Cache for 1 hour

export const metadata = createSeoMetadata({
  title: "AI Resume Builder for Freshers & Professionals | NextCV",
  description:
    "Build an ATS-friendly resume with AI. Match your resume to a job description, find missing skills, and create a tailored cover letter. Free to build, with one-time pricing.",
  path: "",
  keywords: [
    "resume builder",
    "ai resume builder",
    "ats friendly resume",
    "resume builder for freshers",
    "resume builder india",
    "job description keyword match",
    "ai cover letter builder",
    "skills for resume",
    "software engineer resume",
    "ai writer for resume",
    "one-time payment resume",
    "ready to download resume",
    "resume templates for freshers",
  ],
});

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#F8F7F3] text-[#17201C] selection:bg-[#dce4ff] selection:text-[#17201C]">
      <LandingHero />
      <WorkflowSection />
      <ATSKeywordSection />
      <AIWritingSection />
      <TemplatesSection />
      <ShareProfileSection />
      <CoverLetterSection />
      <PricingSection />
      <FAQSection />
      <LandingFinalCTA />
    </div>
  );
}
