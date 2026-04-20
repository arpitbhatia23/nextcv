import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialFormData = {
  name: "",
  phone_no: "",
  email: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  jobRole: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
  projects: [],
};

const useResumeStore = create(
  persist(
    set => ({
      formData: initialFormData,
      selectedTemplate: "",

      setSelectedTemplate: (key = "InfographicLite") => set(() => ({ selectedTemplate: key })),

      updateForm: data =>
        set(state => ({
          formData: { ...state.formData, ...data },
        })),

      resetForm: () => set({ formData: initialFormData }),
      clearStorage: () => {
        console.log("clearing...");
        localStorage.removeItem("resume-draft");
      },
    }),

    {
      name: "resume-draft",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        state._hasHydrated = true;
      },
    }
  )
);

export default useResumeStore;
