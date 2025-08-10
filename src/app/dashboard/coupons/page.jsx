import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Coupons = dynamic(() => import("@/components/Coupons"));

export function generateMetadata() {
  return {
    title: "Coupons -NEXTCV",
    description: "this is coupon page for nextcv",
  };
}

const page = () => {
  return (
    <Suspense>
      <Coupons />
    </Suspense>
  );
};

export default page;
