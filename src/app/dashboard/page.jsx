"use client";

import AdminiDashboard from "@/components/AdminiDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserDashboard from "@/components/UserDashboard";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  return <>{isAdmin ? <AdminiDashboard /> : <UserDashboard />}</>;
}
