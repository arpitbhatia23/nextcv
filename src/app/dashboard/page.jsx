import { requiredAuth } from "@/shared/utils/ReqireAuth";
import DashboardRouter from "./DashboardRouter";

export const metadata = {
  title: "Dashboard | Nextcv",
  description: "Dashboard for managing your account and viewing activity.",
};

export default async function Page() {
  const session = await requiredAuth();
  const role = session?.user?.role;

  return (
    <>
      <DashboardRouter role={role} />
    </>
  );
}
