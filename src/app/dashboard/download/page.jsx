import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/modules/auth";
import DownloadPageContent from "@/modules/resume/components/DownloadResume";
import Resume from "@/modules/resume/models/resume.model";
import { dbConnect } from "@/shared";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const { resumeId, coverLetterId } = await searchParams;
  console.log(resumeId, coverLetterId);
  if (!resumeId && !coverLetterId) {
    notFound();
  }

  await dbConnect();

  const isAdmin = session.user.role === "admin";

  if (resumeId) {
    const resume = await Resume.findById(resumeId).lean();

    if (!resume) {
      notFound();
    }

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

  const coverLetter = await CoverLetter.findById(coverLetterId).lean();

  if (!coverLetter) {
    notFound();
  }

  const isPaid =
    coverLetter.isPaid === true ||
    coverLetter.status === "paid" ||
    coverLetter.paymentStatus === "paid";

  if (!isAdmin && !isPaid) {
    notFound();
  }

  return (
    <Suspense>
      <DownloadPageContent coverLetterId={coverLetterId} />
    </Suspense>
  );
}
