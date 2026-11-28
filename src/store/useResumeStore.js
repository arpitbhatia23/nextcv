import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const initialFormData = {
  name: "",
  phone_no: "",
  email: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  jobRole: "",
  jobDescription: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
  projects: [],
  certificates: [],
};

const createResumeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `resume_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

const normalizeFormData = (data = {}) => ({
  ...initialFormData,
  ...data,
  experience: Array.isArray(data.experience) ? data.experience : [],
  skills: Array.isArray(data.skills) ? data.skills : [],
  education: Array.isArray(data.education) ? data.education : [],
  projects: Array.isArray(data.projects) ? data.projects : [],
  certificates: Array.isArray(data.certificates) ? data.certificates : [],
});

const createDraft = (title = "Untitled Resume", overrides = {}) => {
  const now = new Date().toISOString();

  return {
    id: overrides.id || createResumeId(),
    mongoId: overrides.mongoId || null,
    title: title || "Untitled Resume",
    formData: normalizeFormData(overrides.formData),
    selectedTemplate: overrides.selectedTemplate || "InfographicLite",
    currentStep: overrides.currentStep || "template-selection",
    status: overrides.status || "draft",
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
  };
};

export const mapRemoteResumeToDraft = doc => {
  if (!doc || !doc._id) return null;
  const id = doc._id.toString();
  const status = doc.status === "paid" || doc.status === "completed" ? "completed" : "draft";
  const formData = normalizeFormData({
    name: doc.name || "",
    phone_no: doc.phone_no || "",
    email: doc.email || "",
    address: doc.address || "",
    linkedin: doc.linkedin || "",
    github: doc.github || "",
    portfolio: doc.portfolio || "",
    jobRole: doc.jobRole || "",
    summary: doc.summary || "",
    experience: doc.experience || [],
    skills: doc.skills || [],
    education: doc.education || [],
    projects: doc.projects || [],
    certificates: doc.certificates || [],
  });

  return {
    id: doc.clientId || id,
    mongoId: id,
    title: doc.title || (doc.name ? `${doc.name}'s Resume` : "Untitled Resume"),
    formData,
    selectedTemplate: doc.ResumeType || "InfographicLite",
    currentStep: doc.currentStep || "basicInfo",
    status,
    rawStatus: doc.status || "draft",
    createdAt: doc.createdAt || new Date().toISOString(),
    updatedAt: doc.lastEditedAt || doc.updatedAt || doc.createdAt || new Date().toISOString(),
  };
};

const useResumeStore = create(
  persist(
    (set, get) => ({
      // Multiple resumes
      resumes: [],
      activeResumeId: null,

      // Current active resume (backward compatibility)
      formData: initialFormData,
      selectedTemplate: "",
      currentStep: "template-selection",
      _hasHydrated: false,

      // Sync status (transient, not persisted)
      saveStatus: "idle", // "idle" | "saving" | "saved" | "error"
      lastSavedAt: null,
      saveError: null,
      saveSeq: 0,

      setSaveStatus: (saveStatus, saveError = null) =>
        set({
          saveStatus,
          saveError,
          ...(saveStatus === "saved" ? { lastSavedAt: new Date().toISOString() } : {}),
        }),

      // Create a new resume
      createResume: (title = "Untitled Resume", overrides = {}) => {
        const resume = createDraft(title, overrides);

        set(state => ({
          resumes: [resume, ...state.resumes],
          activeResumeId: resume.id,
          formData: resume.formData,
          selectedTemplate: resume.selectedTemplate,
          currentStep: resume.currentStep,
          saveStatus: "idle",
          saveError: null,
        }));

        return resume.id;
      },

      // Open an existing resume by local id or mongoId
      setActiveResume: id => {
        const resume = get().resumes.find(item => item.id === id || item.mongoId === id);

        if (!resume) return false;

        set({
          activeResumeId: resume.id,
          formData: normalizeFormData(resume.formData),
          selectedTemplate: resume.selectedTemplate || "InfographicLite",
          currentStep: resume.currentStep || "basicInfo",
          saveStatus: "idle",
          saveError: null,
        });

        return true;
      },

      // Insert or update a resume from MongoDB without creating duplicates
      upsertRemoteResume: (doc, { activate = false } = {}) => {
        const mapped = mapRemoteResumeToDraft(doc);
        if (!mapped) return null;

        let resolvedId = mapped.id;

        set(state => {
          const existingIndex = state.resumes.findIndex(
            item =>
              item.mongoId === mapped.mongoId ||
              item.id === mapped.mongoId ||
              (mapped.id && item.id === mapped.id)
          );

          let nextResumes;
          if (existingIndex >= 0) {
            const existing = state.resumes[existingIndex];
            resolvedId = existing.id;

            const existingTime = new Date(existing.updatedAt || 0).getTime();
            const remoteTime = new Date(mapped.updatedAt || 0).getTime();
            const useRemote = remoteTime >= existingTime || activate;

            const merged = useRemote
              ? {
                  ...existing,
                  ...mapped,
                  id: existing.id,
                }
              : {
                  ...existing,
                  mongoId: mapped.mongoId,
                  rawStatus: mapped.rawStatus || existing.rawStatus,
                };

            nextResumes = state.resumes.map((item, idx) => (idx === existingIndex ? merged : item));
          } else {
            nextResumes = [mapped, ...state.resumes];
          }

          if (!activate) {
            return { resumes: nextResumes };
          }

          const target = nextResumes.find(item => item.id === resolvedId) || mapped;
          return {
            resumes: nextResumes,
            activeResumeId: target.id,
            formData: normalizeFormData(target.formData),
            selectedTemplate: target.selectedTemplate || "InfographicLite",
            currentStep: target.currentStep || "basicInfo",
            saveStatus: "saved",
            saveError: null,
          };
        });

        return resolvedId;
      },

      // Attach mongoId to a local resume after sync
      setResumeMongoId: (localId, mongoId) =>
        set(state => ({
          resumes: state.resumes.map(resume =>
            resume.id === localId ? { ...resume, mongoId } : resume
          ),
        })),

      // Update form and automatically save draft
      updateForm: data =>
        set(state => {
          const formData = normalizeFormData({
            ...state.formData,
            ...data,
          });
          const now = new Date().toISOString();

          const hasActive =
            state.activeResumeId && state.resumes.some(r => r.id === state.activeResumeId);

          if (!hasActive) {
            const title = formData.name ? `${formData.name}'s Resume` : "Untitled Resume";
            const newDraft = createDraft(title, {
              formData,
              selectedTemplate: state.selectedTemplate || "InfographicLite",
              currentStep: state.currentStep || "basicInfo",
            });
            return {
              activeResumeId: newDraft.id,
              formData,
              selectedTemplate: newDraft.selectedTemplate,
              resumes: [newDraft, ...state.resumes],
              saveSeq: state.saveSeq + 1,
            };
          }

          return {
            formData,
            saveSeq: state.saveSeq + 1,
            resumes: state.resumes.map(resume =>
              resume.id === state.activeResumeId
                ? {
                    ...resume,
                    formData,
                    updatedAt: now,
                  }
                : resume
            ),
          };
        }),

      // Change selected template
      setSelectedTemplate: (key = "InfographicLite") =>
        set(state => {
          const now = new Date().toISOString();
          const hasActive =
            state.activeResumeId && state.resumes.some(r => r.id === state.activeResumeId);

          if (!hasActive) {
            const newDraft = createDraft("Untitled Resume", {
              formData: state.formData,
              selectedTemplate: key,
              currentStep: state.currentStep || "template-selection",
            });
            return {
              activeResumeId: newDraft.id,
              selectedTemplate: key,
              resumes: [newDraft, ...state.resumes],
              saveSeq: state.saveSeq + 1,
            };
          }

          return {
            selectedTemplate: key,
            saveSeq: state.saveSeq + 1,
            resumes: state.resumes.map(resume =>
              resume.id === state.activeResumeId
                ? {
                    ...resume,
                    selectedTemplate: key,
                    updatedAt: now,
                  }
                : resume
            ),
          };
        }),

      // Save current editor step
      setCurrentStep: step =>
        set(state => {
          if (state.currentStep === step) {
            const active = state.resumes.find(r => r.id === state.activeResumeId);
            if (active && active.currentStep === step) {
              return state;
            }
          }

          const now = new Date().toISOString();
          const hasActive =
            state.activeResumeId && state.resumes.some(r => r.id === state.activeResumeId);

          if (!hasActive) {
            const newDraft = createDraft("Untitled Resume", {
              formData: state.formData,
              selectedTemplate: state.selectedTemplate || "InfographicLite",
              currentStep: step,
            });
            return {
              activeResumeId: newDraft.id,
              currentStep: step,
              resumes: [newDraft, ...state.resumes],
              saveSeq: state.saveSeq + 1,
            };
          }

          return {
            currentStep: step,
            saveSeq: state.saveSeq + 1,
            resumes: state.resumes.map(resume =>
              resume.id === state.activeResumeId
                ? {
                    ...resume,
                    currentStep: step,
                    updatedAt: now,
                  }
                : resume
            ),
          };
        }),

      // Rename resume
      renameResume: (id, title) =>
        set(state => ({
          saveSeq: state.saveSeq + 1,
          resumes: state.resumes.map(resume =>
            resume.id === id || resume.mongoId === id
              ? {
                  ...resume,
                  title: title?.trim() || "Untitled Resume",
                  updatedAt: new Date().toISOString(),
                }
              : resume
          ),
        })),

      // Mark resume completed (only on final submission/payment)
      markResumeCompleted: id =>
        set(state => {
          const targetId = id || state.activeResumeId;
          return {
            resumes: state.resumes.map(resume =>
              resume.id === targetId || resume.mongoId === targetId
                ? {
                    ...resume,
                    status: "completed",
                    updatedAt: new Date().toISOString(),
                  }
                : resume
            ),
          };
        }),

      // Delete a particular resume
      deleteResume: id => {
        const remaining = get().resumes.filter(resume => resume.id !== id && resume.mongoId !== id);
        const activeId = get().activeResumeId;
        const activeDeleted =
          activeId === id ||
          get().resumes.some(r => r.id === activeId && (r.id === id || r.mongoId === id));

        if (activeDeleted) {
          const nextResume = remaining[0];

          set({
            resumes: remaining,
            activeResumeId: nextResume?.id || null,
            formData: nextResume?.formData
              ? normalizeFormData(nextResume.formData)
              : initialFormData,
            selectedTemplate: nextResume?.selectedTemplate || "",
            currentStep: nextResume?.currentStep || "template-selection",
          });
        } else {
          set({ resumes: remaining });
        }
      },

      // Reset current resume's form
      resetForm: () => get().updateForm({ ...initialFormData }),

      // Backward-compatible clearStorage: clears only active draft without deleting other resumes
      clearStorage: () => {
        const activeId = get().activeResumeId;
        if (activeId) {
          get().deleteResume(activeId);
        } else {
          set({
            formData: initialFormData,
            selectedTemplate: "",
            currentStep: "template-selection",
          });
        }
      },

      // Update hydration status
      setHasHydrated: value => set({ _hasHydrated: value }),
    }),

    {
      name: "resume-draft",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      partialize: state => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
        formData: state.formData,
        selectedTemplate: state.selectedTemplate,
        currentStep: state.currentStep,
      }),

      // Migrate existing single-resume storage
      migrate: (persistedState, version) => {
        if (!persistedState) return persistedState;

        if (version === 0 || version === 1 || !Array.isArray(persistedState.resumes)) {
          const oldData = normalizeFormData(persistedState?.formData || initialFormData);
          const now = new Date().toISOString();

          const hasMeaningfulData =
            oldData.name ||
            oldData.email ||
            oldData.summary ||
            oldData.experience.length > 0 ||
            oldData.education.length > 0 ||
            oldData.skills.length > 0 ||
            oldData.projects.length > 0;

          if (!hasMeaningfulData && !persistedState?.selectedTemplate) {
            return {
              resumes: [],
              activeResumeId: null,
              formData: initialFormData,
              selectedTemplate: "",
              currentStep: "template-selection",
            };
          }

          const resume = {
            id: createResumeId(),
            mongoId: null,
            title: oldData.name ? `${oldData.name}'s Resume` : "My Resume",
            formData: oldData,
            selectedTemplate: persistedState?.selectedTemplate || "InfographicLite",
            currentStep: "basicInfo",
            status: "draft",
            createdAt: now,
            updatedAt: now,
          };

          return {
            resumes: [resume],
            activeResumeId: resume.id,
            formData: oldData,
            selectedTemplate: resume.selectedTemplate,
            currentStep: "basicInfo",
          };
        }

        return persistedState;
      },

      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useResumeStore;
