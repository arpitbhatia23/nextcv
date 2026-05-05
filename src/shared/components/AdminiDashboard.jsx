"use client";
import React, { useState } from "react";
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

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "payment", label: "Payments", icon: CreditCard },
  { id: "coupons", label: "Coupons", icon: TicketPercent },
];

// Per-tab accent colours
const TAB_ACCENT = {
  overview: { active: "border-indigo-600  text-indigo-600  bg-indigo-50/70" },
  analytics: { active: "border-violet-600  text-violet-600  bg-violet-50/70" },
  payment: { active: "border-emerald-600 text-emerald-700 bg-emerald-50/70" },
  coupons: { active: "border-amber-500   text-amber-700   bg-amber-50/70" },
};

const AdminiDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-slate-50">
      {/* ── Tab Navigation bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-2 sm:px-4 lg:px-6">
          <nav
            role="tablist"
            aria-label="Admin dashboard sections"
            className="flex overflow-x-auto scrollbar-hide"
          >
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              const accentCls = TAB_ACCENT[id].active;

              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  id={`tab-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={[
                    // base
                    "group relative flex items-center gap-2 px-3 sm:px-5 py-3.5 sm:py-4",
                    "text-xs sm:text-sm font-semibold whitespace-nowrap select-none",
                    "border-b-2 transition-all duration-200 shrink-0",
                    // state
                    isActive
                      ? accentCls
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-105",
                    ].join(" ")}
                  />
                  {/* Full label always visible — short on tiny screens */}
                  <span className="hidden xs:inline">{label}</span>
                  {/* Two-letter fallback on truly tiny screens */}
                  <span className="inline xs:hidden">{label.slice(0, 3)}</span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Tab Panels — Only render active tab to optimize INP ─── */}
      <div className="flex-1 flex flex-col">
        {activeTab === "overview" && (
          <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="@container/main flex flex-1 flex-col gap-2">
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
          <div id="panel-analytics" role="tabpanel" aria-labelledby="tab-analytics" className="flex-1">
            <AnalyticsPage />
          </div>
        )}

        {activeTab === "payment" && (
          <div id="panel-payment" role="tabpanel" aria-labelledby="tab-payment" className="flex-1">
            <AdminPaymentDashboard />
          </div>
        )}

        {activeTab === "coupons" && (
          <div id="panel-coupons" role="tabpanel" aria-labelledby="tab-coupons" className="flex-1">
            <Coupons />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminiDashboard;
