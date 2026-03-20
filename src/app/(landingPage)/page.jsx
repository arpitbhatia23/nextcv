import dynamic from "next/dynamic";
import Herosection from "@/components/herosection/Herosection";
import ATSFeatureSection from "@/components/herosection/ATSFeatureSection";
const HowitWork = dynamic(() => import("@/components/herosection/HowitWork"));
const Templates = dynamic(() => import("@/components/templateslanding/Templates"));
const ProcessWorks = dynamic(() => import("@/components/processWorks/ProcessWorks"));
const Testimonial = dynamic(() => import("@/components/testimonial/Testimonial"));
const PageContent = dynamic(() => import("@/components/pageContent/PageContent"));

const FAQ = dynamic(() => import("@/components/herosection/FAQ"));
const SEOKeywordCloud = dynamic(() => import("@/components/herosection/SEOKeywordCloud"));

export default function Home() {
  return (
    <>
      <Herosection />
      <ATSFeatureSection />

      <PageContent />
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
