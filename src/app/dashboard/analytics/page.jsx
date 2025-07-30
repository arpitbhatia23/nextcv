import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const AnalyticsPage = dynamic(() => import("@/components/analatics"));
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
