import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Coupons = dynamic(() => import("@/components/Coupons"));

import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/options";
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
