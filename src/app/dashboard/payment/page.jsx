import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const AdminPaymentDashboard = dynamic(() =>
  import("@/components/PaymentAnalaytics")
);
export function generateMetadata() {
  return {
    title: "Payment -NEXTCV",
    description: "this is payement page for nextcv",
  };
}

const page = () => {
  return (
    <div>
      <Suspense>
        <AdminPaymentDashboard />
      </Suspense>
    </div>
  );
};

export default page;
