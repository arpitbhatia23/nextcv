import { getServerSession } from "next-auth";
import authOptions from "../api/auth/options";
import dynamic from "next/dynamic";

const AdminiDashboard = dynamic(() => import("@/components/AdminiDashboard"));
const UserDashboard = dynamic(() => import("@/components/UserDashboard"));

export async function generateMetadata() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";
  return {
    title: isAdmin ? "Admin Dashboard" : "User Dashboard",
    description: "Dashboard for managing your account and viewing activity.",
  };
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  return isAdmin ? <AdminiDashboard /> : <UserDashboard />;
}
