"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Element } from "react-scroll";

// Dynamic imports (ssr: false for client-only rendering)
const Herosection = dynamic(
  () => import("@/components/herosection/Herosection")
);
const HowitWork = dynamic(() => import("@/components/herosection/HowitWork"));
const Templates = dynamic(
  () => import("@/components/templateslanding/Templates")
);
const ProcessWorks = dynamic(
  () => import("@/components/processWorks/ProcessWorks")
);
const Testimonial = dynamic(
  () => import("@/components/testimonial/Testimonial")
);
const PageContent = dynamic(
  () => import("@/components/pageContent/PageContent")
);

export default function Home() {
  return (
    <>
      <Element name="Home">
        <Herosection />
      </Element>

      <Element name="Why Choose Us">
        <PageContent />
      </Element>

      <Element name="Templates">
        <Templates />
      </Element>

      <Element name="How it work">
        <HowitWork />
      </Element>

      <Element name="Get Started">
        <ProcessWorks />
      </Element>

      <Element name="Testimonial">
        <Testimonial />
      </Element>
    </>
  );
}
