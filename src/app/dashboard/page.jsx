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
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dashboard",
    url: "https://www.nextcv.in/dashboard",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
  };
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      {isAdmin ? <AdminiDashboard /> : <UserDashboard />}
    </>
  );
}
