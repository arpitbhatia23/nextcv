import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const AdminPaymentDashboard = dynamic(() =>
  import("@/components/PaymentAnalaytics")
);
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/options";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Payment -NEXTCV",
    description: "this is payement page for nextcv",
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
        <AdminPaymentDashboard />
      </Suspense>
    </div>
  );
};

export default page;
