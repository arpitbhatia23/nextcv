"use client";
import React, { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { BarChart3, CreditCard, TicketPercent, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeableTabs } from "../hooks/useSwipe.js";
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
  const [isPending, startTransition] = useTransition();
  const { activeTab, direction, goToTab, swipeHandlers, variants } = useSwipeableTabs(
    TABS,
    "overview"
  );
  const handleTabChange = id => {
    startTransition(() => {
      goToTab(id);
    });
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#F1F5EF] text-[#1C261E]">
      <FontImports />

      {/* ── Header tab bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-[#DDE2D9]">
        <div className="px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#456B4A]">
                ADMIN WORKSPACE
              </div>
              <h1 className="font-display text-lg sm:text-xl font-medium text-[#1C261E]">
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
                      ? "bg-[#E5ECE2] text-[#344B38] shadow-xs"
                      : "text-[#5A665B] hover:bg-[#E8EFE5] hover:text-[#344B38]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[10px] tracking-wider transition-colors",
                      isActive ? "text-[#456B4A]" : "text-[#5A665B]",
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
                  {isActive && <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#344B38]" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Tab Panels — Only render active tab to optimize INP ─── */}
      <div className="flex-1 flex flex-col min-h-150">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22 }}
            {...swipeHandlers}
            className="flex-1 min-w-0 touch-pan-y"
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminiDashboard;
