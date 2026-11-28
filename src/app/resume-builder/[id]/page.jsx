"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useResumeStore from "@/store/useResumeStore";
import { getRouteForStep } from "@/modules/resume/hooks/useResumeAutoSave";

export default function ResumeBuilderDraftLoaderPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const hasHydrated = useResumeStore(s => s._hasHydrated);
  const setActiveResume = useResumeStore(s => s.setActiveResume);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!id) {
      router.replace("/dashboard");
      return;
    }

    const found = setActiveResume(id);
    if (!found) {
      router.replace("/dashboard");
      return;
    }

    const active = useResumeStore
      .getState()
      .resumes.find(item => item.id === id || item.mongoId === id);
    const targetRoute = getRouteForStep(active?.currentStep || "basicInfo");
    router.replace(targetRoute);
  }, [hasHydrated, id, router, setActiveResume]);

  return (
    <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center px-6">
      <div className="border border-[#DDE3D9] bg-white px-6 py-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#456B4A]">
          Resume Where You Left Off
        </p>
        <p className="mt-2 text-sm text-[#5B625C]">Restoring your saved resume draft...</p>
      </div>
    </div>
  );
}
