"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Element } from "react-scroll";

// Dynamic imports (ssr: false for client-only rendering)
const Herosection = dynamic(
  () => import("@/components/herosection/Herosection"),
);
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

export default function Home() {
  return (
    <>
      <Herosection />

      <PageContent />
      <Element name="Templates">
        <Templates />
      </Element>

      <HowitWork />

      <ProcessWorks />

      <Testimonial />
    </>
  );
}
