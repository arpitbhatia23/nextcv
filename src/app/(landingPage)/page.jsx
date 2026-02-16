

import React from "react";
import dynamic from "next/dynamic";

import Herosection from "@/components/herosection/Herosection";

// Dynamic imports (ssr: false for client-only rendering)
// Dynamic imports (ssr: false for client-only rendering)
const HowitWork = dynamic(() => import("@/components/herosection/HowitWork"));
const Templates = dynamic(
  () => import("@/components/templateslanding/Templates"),
);
const ProcessWorks = dynamic(
  () => import("@/components/processWorks/ProcessWorks"),
);
const Testimonial = dynamic(
  () => import("@/components/testimonial/Testimonial"),
);
const PageContent = dynamic(
  () => import("@/components/pageContent/PageContent"),
);
const ATSFeatureSection = dynamic(
  () => import("@/components/herosection/ATSFeatureSection"),
);
const FAQ = dynamic(() => import("@/components/herosection/FAQ"));

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
    </>
  );
}
