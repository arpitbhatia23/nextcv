import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand Store with Persistence
export const useResumeStoreChat = create(
  persist(
    (set) => ({
      messages: [{ sender: "bot", text: "👋 Welcome! What's your full name?" }],
      answers: {},
      step: 0,
      fieldStep: 0,
      repeatIndex: {},
      isComplete: false,
      apiError: null,
      generatedResumeUrl: null,

      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      setAnswers: (answers) => set({ answers }),
      updateAnswer: (key, value, section, index) =>
        set((state) => {
          if (section !== undefined && index !== undefined) {
            const updated = [...(state.answers[section] || [])];
            if (!updated[index]) updated[index] = {};
            updated[index][key] = value;
            return { answers: { ...state.answers, [section]: updated } };
          }
          return { answers: { ...state.answers, [key]: value } };
        }),
      setStep: (step) => set({ step }),
      setFieldStep: (fieldStep) => set({ fieldStep }),
      setRepeatIndex: (repeatIndex) => set({ repeatIndex }),
      updateRepeatIndex: (key) =>
        set((state) => ({
          repeatIndex: {
            ...state.repeatIndex,
            [key]: (state.repeatIndex[key] || 0) + 1,
          },
        })),
      setIsComplete: (isComplete) => set({ isComplete }),
      setApiError: (apiError) => set({ apiError }),
      setGeneratedResumeUrl: (url) => set({ generatedResumeUrl: url }),
      resetStore: () =>
        set({
          messages: [
            { sender: "bot", text: "👋 Welcome! What's your full name?" },
          ],
          answers: {},
          step: 0,
          fieldStep: 0,
          repeatIndex: {},
          isComplete: false,
          apiError: null,
          generatedResumeUrl: null,
        }),
    }),
    {
      name: "resume-chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        answers: state.answers,
        step: state.step,
        fieldStep: state.fieldStep,
        repeatIndex: state.repeatIndex,
        isComplete: state.isComplete,
      }),
    }
  )
);
