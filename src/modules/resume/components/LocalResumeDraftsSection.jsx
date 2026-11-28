"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Clock, Edit3, FileText, Pencil, Plus, Trash2, X } from "lucide-react";
import useResumeStore from "@/store/useResumeStore";
import { getRouteForStep } from "@/modules/resume/hooks/useResumeAutoSave";

export function calculateResumeCompletion(formData = {}) {
  let score = 0;
  if (formData.name?.trim()) score += 15;
  if (formData.email?.trim() || formData.phone_no?.trim()) score += 15;
  if (formData.jobRole?.trim()) score += 10;
  if (Array.isArray(formData.education) && formData.education.length > 0) score += 15;
  if (Array.isArray(formData.skills) && formData.skills.length > 0) score += 15;
  if (
    (Array.isArray(formData.experience) && formData.experience.length > 0) ||
    (Array.isArray(formData.projects) && formData.projects.length > 0)
  ) {
    score += 15;
  }
  if (formData.summary?.trim()) score += 15;
  return Math.min(100, score);
}

function formatLastEdited(isoString) {
  if (!isoString) return "Just now";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LocalResumeDraftsSection({ showCompleted = true }) {
  const router = useRouter();
  const hasHydrated = useResumeStore(s => s._hasHydrated);
  const resumes = useResumeStore(s => s.resumes);
  const activeResumeId = useResumeStore(s => s.activeResumeId);
  const createResume = useResumeStore(s => s.createResume);
  const renameResume = useResumeStore(s => s.renameResume);
  const deleteResume = useResumeStore(s => s.deleteResume);

  const [editingId, setEditingId] = useState(null);
  const [titleInput, setTitleInput] = useState("");

  const { drafts, completed, lastSession } = useMemo(() => {
    const sorted = [...(resumes || [])].sort(
      (a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
    );
    const draftList = sorted.filter(r => r.status !== "completed");
    const completedList = sorted.filter(r => r.status === "completed");
    const active = draftList.find(r => r.id === activeResumeId) || draftList[0] || null;
    return { drafts: draftList, completed: completedList, lastSession: active };
  }, [resumes, activeResumeId]);

  const handleCreateNew = () => {
    router.push("/dashboard/builder");
  };

  const handleContinueEditing = id => {
    router.push(`/resume-builder/${id}`);
  };

  const startRename = resume => {
    setEditingId(resume.id);
    setTitleInput(resume.title || "Untitled Resume");
  };

  const saveRename = id => {
    renameResume(id, titleInput);
    setEditingId(null);
  };

  if (!hasHydrated) return null;

  const visibleResumes = showCompleted ? [...drafts, ...completed] : drafts;

  return (
    <section className="space-y-6">
      {/* Resume Where You Left Off banner */}
      {lastSession && (
        <div className="border border-[#344B38] bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#456B4A]">
              Resume Where You Left Off
            </div>
            <h3 className="font-display text-lg font-medium text-[#1C261E] truncate mt-1">
              {lastSession.title || "Untitled Resume"}
            </h3>
            <p className="text-xs text-[#5A665B] mt-1">
              Template:{" "}
              <span className="font-medium">
                {lastSession.selectedTemplate || "InfographicLite"}
              </span>
              {" · "}
              {calculateResumeCompletion(lastSession.formData)}% complete
              {" · "}
              Last edited {formatLastEdited(lastSession.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                router.push(
                  getRouteForStep(lastSession.currentStep)
                    ? `/resume-builder/${lastSession.id}`
                    : "/dashboard/builder"
                )
              }
              className="inline-flex items-center gap-2 bg-[#344B38] hover:bg-[#27392A] text-white px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer"
            >
              Continue Editing
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-[10px] tracking-widest uppercase text-[#5A665B] whitespace-nowrap">
            Resume Drafts ({drafts.length})
          </h3>
          {showCompleted && completed.length > 0 && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#356344]">
              · My Resumes ({completed.length})
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 border border-[#344B38] bg-white hover:bg-[#E8EFE5] text-[#344B38] px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Resume
        </button>
      </div>

      {visibleResumes.length === 0 ? (
        <div className="border border-dashed border-[#DDE2D9] bg-white p-6 text-center">
          <FileText className="w-6 h-6 mx-auto text-[#8A9388] mb-2" />
          <p className="text-sm font-medium text-[#1C261E]">No saved resume drafts yet</p>
          <p className="text-xs text-[#5A665B] mt-1">
            Click &ldquo;Create New Resume&rdquo; to start a draft with automatic local saving.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleResumes.map(resume => {
            const completion = calculateResumeCompletion(resume.formData);
            const isCompleted = resume.status === "completed";
            const isRenaming = editingId === resume.id;

            return (
              <div
                key={resume.id}
                className="border border-[#DDE2D9] bg-white p-5 flex flex-col justify-between gap-4 transition-colors hover:border-[#B8C2B4]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    {isRenaming ? (
                      <div className="flex items-center gap-1.5 flex-1">
                        <input
                          type="text"
                          value={titleInput}
                          onChange={e => setTitleInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") saveRename(resume.id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          className="flex-1 border border-[#344B38] px-2 py-1 text-sm text-[#1C261E] focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => saveRename(resume.id)}
                          aria-label="Save title"
                          className="p-1 text-[#356344] hover:bg-[#E8EFE5]"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          aria-label="Cancel rename"
                          className="p-1 text-[#5A665B] hover:bg-[#F1F5EF]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h4 className="font-display text-base font-medium text-[#1C261E] truncate">
                          {resume.title || "Untitled Resume"}
                        </h4>
                        <button
                          type="button"
                          onClick={() => startRename(resume)}
                          aria-label="Rename resume"
                          className="p-1 text-[#8A9388] hover:text-[#1C261E] shrink-0"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span
                      className={`shrink-0 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border ${
                        isCompleted
                          ? "bg-[#EAF3E8] border-[#B8D0B8] text-[#356344]"
                          : "bg-[#F8F7F3] border-[#DDE2D9] text-[#5A665B]"
                      }`}
                    >
                      {isCompleted ? "Completed" : "Draft"}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5A665B]">
                    <span>{resume.selectedTemplate || "InfographicLite"}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatLastEdited(resume.updatedAt)}
                    </span>
                  </div>

                  {/* Completion bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5A665B] mb-1">
                      <span>COMPLETION</span>
                      <span>{completion}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E7EBE4] overflow-hidden">
                      <div
                        className="h-full bg-[#456B4A] transition-all duration-300"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EDF0EA]">
                  <button
                    type="button"
                    onClick={() => handleContinueEditing(resume.id)}
                    className="inline-flex items-center gap-1.5 bg-[#344B38] hover:bg-[#27392A] text-white px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Continue Editing
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteResume(resume.id)}
                    aria-label={`Delete ${resume.title || "resume"}`}
                    className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-red-600 px-2.5 py-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
