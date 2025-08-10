import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const AdminPaymentDashboard = dynamic(() =>
  import("@/components/PaymentAnalaytics")
);
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
