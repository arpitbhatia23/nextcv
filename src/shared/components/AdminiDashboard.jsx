"use client";
import React, { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { BarChart3, CreditCard, TicketPercent, LayoutDashboard } from "lucide-react";

// All sections loaded once with `ssr: false` — stay mounted, never remount
const SectionCards = dynamic(() => import("@/shared/components/section-cards.jsx"), {
  ssr: false,
});
const AdminFeedbackList = dynamic(() => import("@/shared/components/AdminFeedbackList"), {
  ssr: false,
});
const CouponStats = dynamic(() => import("@/modules/coupon/components/CouponStats"), {
  ssr: false,
});
const AnalyticsPage = dynamic(() => import("@/shared/components/analatics"), {
  ssr: false,
});
const AdminPaymentDashboard = dynamic(
  () => import("@/modules/payment/components/PaymentAnalaytics"),
  { ssr: false }
);
const Coupons = dynamic(() => import("@/modules/coupon/components/Coupons"), {
  ssr: false,
});

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, code: "01" },
  { id: "analytics", label: "Analytics", icon: BarChart3, code: "02" },
  { id: "payment", label: "Payments", icon: CreditCard, code: "03" },
  { id: "coupons", label: "Coupons", icon: TicketPercent, code: "04" },
];

const AdminiDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = id => {
    startTransition(() => {
      setActiveTab(id);
    });
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <FontImports />

      {/* ── Header tab bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-[#E3E2DC]">
        <div className="px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#465B9E]">
                ADMIN WORKSPACE
              </div>
              <h1 className="font-display text-lg sm:text-xl font-medium text-[#17201C]">
                Platform Control Ledger
              </h1>
            </div>
          </div>

          <nav
            role="tablist"
            aria-label="Admin dashboard sections"
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1"
          >
            {TABS.map(({ id, label, icon: Icon, code }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  id={`tab-${id}`}
                  onClick={() => handleTabChange(id)}
                  disabled={isPending}
                  className={[
                    "group relative flex items-center gap-2 px-3.5 py-2 rounded-xl",
                    "font-sans text-xs sm:text-sm font-medium transition-all duration-200 shrink-0",
                    isPending ? "opacity-50" : "opacity-100",
                    isActive
                      ? "bg-[#EEF0F7] text-[#465B9E] shadow-xs"
                      : "text-[#5B625C] hover:bg-[#F1F0EB] hover:text-[#17201C]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[10px] tracking-wider transition-colors",
                      isActive ? "text-[#465B9E]" : "text-[#8A908B]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {code}
                  </span>
                  <Icon
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    strokeWidth={1.75}
                  />
                  <span>{label}</span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#465B9E]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Tab Panels — Only render active tab to optimize INP ─── */}
      <div className="flex-1 flex flex-col min-h-150">
        {activeTab === "overview" && (
          <div
            id="panel-overview"
            role="tabpanel"
            aria-labelledby="tab-overview"
            className="@container/main flex flex-1 flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-3 sm:px-4 lg:px-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <CouponStats />
                  <AdminFeedbackList />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div
            id="panel-analytics"
            role="tabpanel"
            aria-labelledby="tab-analytics"
            className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <AnalyticsPage />
          </div>
        )}

        {activeTab === "payment" && (
          <div
            id="panel-payment"
            role="tabpanel"
            aria-labelledby="tab-payment"
            className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <AdminPaymentDashboard />
          </div>
        )}

        {activeTab === "coupons" && (
          <div
            id="panel-coupons"
            role="tabpanel"
            aria-labelledby="tab-coupons"
            className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <Coupons />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminiDashboard;
