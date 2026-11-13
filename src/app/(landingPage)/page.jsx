import { createSeoMetadata } from "@/shared/utils/seo";
import LandingHero from "@/shared/components/landing/LandingHero";
import ValuePropsSection from "@/shared/components/landing/ValuePropsSection";
import WorkflowSection from "@/shared/components/landing/WorkflowSection";
import ATSKeywordSection from "@/shared/components/landing/ATSKeywordSection";
import AIWritingSection from "@/shared/components/landing/AIWritingSection";
import TemplatesSection from "@/shared/components/landing/TemplatesSection";
import AudienceSection from "@/shared/components/landing/AudienceSection";
import ShareProfileSection from "@/shared/components/landing/ShareProfileSection";
import CoverLetterSection from "@/shared/components/landing/CoverLetterSection";
import PricingSection from "@/shared/components/landing/PricingSection";
import FAQSection from "@/shared/components/landing/FAQSection";
import LandingFinalCTA from "@/shared/components/landing/LandingFinalCTA";

export const revalidate = 3600; // Cache for 1 hour

export const metadata = createSeoMetadata({
  title: "AI Resume Builder India for Freshers | NextCV",
  description:
    "Build an ATS-friendly resume with AI writing, templates and job matching. Edit for free; download from ₹49 with no subscription.",
  path: "",
  keywords: [
    "resume builder",
    "ai resume builder",
    "ats friendly resume",
    "resume builder for freshers",
    "resume builder india",
    "online resume maker india",
    "free resume builder india",
    "job description keyword match",
    "ai cover letter builder",
    "skills for resume",
    "software engineer resume",
    "ai writer for resume",
    "ai resume writer",
    "one-time payment resume",
    "ready to download resume",
    "resume templates for freshers",
  ],
});

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#F8F7F3] text-[#17201C] selection:bg-[#dce4ff] selection:text-[#17201C]">
      <LandingHero />
      <ValuePropsSection />
      <WorkflowSection />
      <ATSKeywordSection />
      <AIWritingSection />
      <TemplatesSection />
      <AudienceSection />
      <ShareProfileSection />
      <CoverLetterSection />
      <PricingSection />
      <FAQSection />
      <LandingFinalCTA />
    </div>
  );
}
