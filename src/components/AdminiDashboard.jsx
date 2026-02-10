import React from "react";
import dynamic from "next/dynamic";

const SectionCards = dynamic(() => import("@/components/section-cards.jsx"));
const ChartAreaInteractive = dynamic(() =>
  import("@/components/chart-area-interactive.jsx")
);
const AdminFeedbackList = dynamic(() => import("@/components/AdminFeedbackList"));
const CouponStats = dynamic(() => import("@/components/CouponStats"));

const AdminiDashboard = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6 space-y-6">
            <ChartAreaInteractive />
            <div className="grid grid-cols-1 gap-6">
               <CouponStats />
               <AdminFeedbackList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminiDashboard;
