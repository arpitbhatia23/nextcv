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

/* Fonts: Fraunces for the letterhead display type, IBM Plex Mono for
   reference codes / labels / tab counters. Body stays on the default sans. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const INK = "#1C2333";
const RUST = "#B3382C";
const TEAL = "#0F6E63";
const AMBER = "#B08900";
const LINE = "#E4E2DC";
const MUTED = "#6B7280";
const PAPER = "#F7F7F5";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, code: "01" },
  { id: "analytics", label: "Analytics", icon: BarChart3, code: "02" },
  { id: "payment", label: "Payments", icon: CreditCard, code: "03" },
  { id: "coupons", label: "Coupons", icon: TicketPercent, code: "04" },
];

// Per-tab accent colours, kept within the letterhead palette
const TAB_ACCENT = {
  overview: INK,
  analytics: "#5B4636", // sepia — reads as ink's warmer sibling
  payment: TEAL,
  coupons: AMBER,
};

const AdminiDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = id => {
    startTransition(() => {
      setActiveTab(id);
    });
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen" style={{ backgroundColor: PAPER }}>
      <FontImports />

      {/* ── Letterhead tab bar ─────────────────────────────────────── */}
      <div
        className="sticky top-0 z-20 border-b-2"
        style={{ backgroundColor: "#FFFFFF", borderColor: INK }}
      >
        <div className="px-2 sm:px-4 lg:px-6">
          <div
            className="font-mono text-[10px] tracking-widest pt-3 pb-1 px-1 sm:px-3"
            style={{ color: RUST }}
          >
            ADMIN LEDGER
          </div>
          <nav
            role="tablist"
            aria-label="Admin dashboard sections"
            className="flex overflow-x-auto scrollbar-hide"
          >
            {TABS.map(({ id, label, icon: Icon, code }) => {
              const isActive = activeTab === id;
              const accent = TAB_ACCENT[id];

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
                    "group relative flex items-center gap-2 px-3 sm:px-5 py-3.5 sm:py-4",
                    "font-mono text-[11px] sm:text-xs tracking-widest uppercase whitespace-nowrap select-none",
                    "border-b-2 transition-all duration-200 shrink-0",
                    isPending ? "opacity-50 grayscale-[0.5]" : "opacity-100",
                  ].join(" ")}
                  style={{
                    borderColor: isActive ? accent : "transparent",
                    color: isActive ? accent : MUTED,
                    backgroundColor: isActive ? PAPER : "transparent",
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-widest opacity-60"
                    aria-hidden="true"
                  >
                    {code}
                  </span>
                  <Icon
                    className={[
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-105",
                    ].join(" ")}
                    strokeWidth={1.5}
                  />
                  {/* Full label always visible — short on tiny screens */}
                  <span className="hidden xs:inline">{label}</span>
                  {/* Two-letter fallback on truly tiny screens */}
                  <span className="inline xs:hidden">{label.slice(0, 3)}</span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span
                      className="ml-1 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
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
