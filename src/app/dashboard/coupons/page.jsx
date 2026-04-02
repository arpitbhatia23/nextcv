import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Coupons = dynamic(() => import("@/modules/coupon/components/Coupons"));

import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Coupons -NEXTCV",
    description: "this is coupon page for nextcv",
  };
}

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <Suspense>
      <Coupons />
    </Suspense>
  );
};

export default page;
