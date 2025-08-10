import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const AnalyticsPage = dynamic(() => import("@/components/analatics"));

export function generateMetadata() {
  return {
    title: "Analytics -NEXTCv",
    description: "Analytics page for NEXTCv",
  };
}
const page = () => {
  return (
    <div>
      <Suspense>
        <AnalyticsPage />
      </Suspense>
    </div>
  );
};

export default page;
