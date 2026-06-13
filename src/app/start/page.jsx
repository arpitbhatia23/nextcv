import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { redirect } from "next/navigation";
import StartClient from "./StartClient";

export const metadata = {
  title: "Start Building Your Resume | NextCV",
  description: "Create a professional, ATS-friendly resume in minutes. Login or sign up to get started.",
};

export default async function StartPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const query = new URLSearchParams(searchParams).toString();
    const dest = `/dashboard/resume/new${query ? `?${query}` : ''}`;
    redirect(dest);
  }

  return <StartClient searchParams={searchParams} />;
}
