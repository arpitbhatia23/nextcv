"use client";

import { DashboardSkeleton } from "@/shared/components/DashboardSkelton";
import dynamic from "next/dynamic";

const UserDashboard = dynamic(() => import("@/shared/components/UserDashboard"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

const AdminDashboard = dynamic(() => import("@/shared/components/AdminiDashboard"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export default function DashboardRouter({ role }) {
  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
}
