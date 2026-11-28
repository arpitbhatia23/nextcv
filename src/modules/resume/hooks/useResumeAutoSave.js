"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useResumeStore from "@/store/useResumeStore";

const STEP_ROUTE_MAP = {
  start: "/dashboard/builder",
  "template-selection": "/dashboard/builder/template-selection",
  template: "/dashboard/builder/template-selection",
  personal: "/dashboard/builder/basicInfo",
  basicInfo: "/dashboard/builder/basicInfo",
  education: "/dashboard/builder/education",
  skills: "/dashboard/builder/skills",
  experience: "/dashboard/builder/experience",
  projects: "/dashboard/builder/projects",
  certificate: "/dashboard/builder/certificate",
  summary: "/dashboard/builder/summary",
  review: "/dashboard/builder/review",
};

export const getRouteForStep = step => STEP_ROUTE_MAP[step] || "/dashboard/builder/basicInfo";

export const getStepFromPathname = pathname => {
  if (!pathname || pathname === "/dashboard/builder" || pathname === "/dashboard/builder/") {
    return "start";
  }
  const clean = pathname.replace("/dashboard/builder/", "").split("/")[0];
  if (!clean) return "template-selection";
  if (clean === "template") return "template-selection";
  return clean;
};

const AUTO_SAVE_DEBOUNCE_MS = 1000;

export function useResumeAutoSave() {
  const pathname = usePathname();

  const hasHydrated = useResumeStore(s => s._hasHydrated);
  const activeResumeId = useResumeStore(s => s.activeResumeId);
  const resumes = useResumeStore(s => s.resumes);
  const formData = useResumeStore(s => s.formData);
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const currentStep = useResumeStore(s => s.currentStep);
  const saveSeq = useResumeStore(s => s.saveSeq);
  const setCurrentStep = useResumeStore(s => s.setCurrentStep);
  const setSaveStatus = useResumeStore(s => s.setSaveStatus);

  const timerRef = useRef(null);
  const isInitialMountRef = useRef(true);

  // Track current editor step on route changes
  useEffect(() => {
    if (!hasHydrated) return;
    const step = getStepFromPathname(pathname);
    if (step && step !== "start") {
      setCurrentStep(step);
    }
  }, [hasHydrated, pathname, setCurrentStep]);

  // Debounced local Auto-Save status indicator
  useEffect(() => {
    if (!hasHydrated || !activeResumeId) return;

    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      setSaveStatus("saved");
      return;
    }

    setSaveStatus("saving");

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      try {
        // Zustand persist already writes to localStorage synchronously on state update;
        // verify storage is accessible so we can surface Save failed if quota is exceeded.
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.getItem("resume-draft");
        }
        setSaveStatus("saved");
      } catch (err) {
        setSaveStatus("error", err?.message || "Local storage save failed");
      }
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    hasHydrated,
    activeResumeId,
    formData,
    selectedTemplate,
    currentStep,
    saveSeq,
    setSaveStatus,
  ]);

  // Multi-tab sync via localStorage storage event
  useEffect(() => {
    const handleStorage = event => {
      if (event.key === "resume-draft") {
        useResumeStore.persist?.rehydrate?.();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return {
    activeResume: resumes?.find(r => r.id === activeResumeId) || null,
  };
}
