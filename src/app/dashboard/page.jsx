"use client";

import AdminiDashboard from "@/components/AdminiDashboard";
import UserDashboard from "@/components/UserDashboard";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  console.log(session);
  const isAdmin = session?.user?.role === "admin";
  return <>{isAdmin ? <AdminiDashboard /> : <UserDashboard />}</>;
}
