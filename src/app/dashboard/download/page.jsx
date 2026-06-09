import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/modules/auth";
import DownloadPageContent from "@/modules/resume/components/DownloadResume";
import Resume from "@/modules/resume/models/resume.model";
import { dbConnect } from "@/shared";

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { resumeId } = await searchParams;

  if (!resumeId) {
    notFound();
  }

  await dbConnect();

  const resume = await Resume.findById(resumeId).lean();

  if (!resume) {
    notFound();
  }

  const isAdmin = session.user.role === "admin";

  const isPaid =
    resume.isPaid === true || resume.status === "paid" || resume.paymentStatus === "paid";

  if (!isAdmin && !isPaid) {
    notFound();
  }

  return (
    <Suspense>
      <DownloadPageContent resumeId={resumeId} />
    </Suspense>
  );
}
