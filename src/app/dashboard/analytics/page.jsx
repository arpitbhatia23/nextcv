import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const AnalyticsPage = dynamic(() => import("@/components/analatics"));

import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Analytics -NEXTCv",
    description: "Analytics page for NEXTCv",
  };
}
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <Suspense>
        <AnalyticsPage />
      </Suspense>
    </div>
  );
};

export default page;
