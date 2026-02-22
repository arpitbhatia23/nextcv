"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResumeStoreChat } from "@/store/chatStore";
import { ChatMessage } from "@/components/Chat";
import {
  Send,
  Sparkles,
  Lightbulb,
  RotateCcw,
  Loader2,
  Award,
} from "lucide-react";
import { useAutoScroll } from "@/hooks/useAutoscroll";
import confetti from "canvas-confetti";
import { flow } from "@/utils/resumeFlow";
import useResumeStore from "@/store/useResumeStore";
import axios from "axios";
import dynamic from "next/dynamic";
const Tour = dynamic(() => import("@/components/Tour"), { ssr: false });
const RESPONSE_DELAY = 1000;

export default function ResumeChat() {
  // --- State & Stores ---
  const store = useResumeStoreChat();
  const updateForm = useResumeStore((state) => state.updateForm);
  const resetForm = useResumeStore((state) => state.resetForm);
  const clearDraft = useResumeStore((state) => state.clearStorage);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);
  const chatEndRef = useRef(null);

  const currentStep = flow[store.step];

  // Initialize auto-scroll mechanism
  const bottomRef = useAutoScroll(store.messages.length);

  const router = useRouter();

  // --- Logic ---
  const addBotMessage = (text, delay = RESPONSE_DELAY) => {
    store.setIsTyping(true);
    setTimeout(() => {
      store.addMessage({ sender: "bot", text });
      store.setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text) => {
    store.addMessage({ sender: "user", text });
  };

  const saveAnswer = (text) => {
    const answerValue = text.toLowerCase() === "skip" ? "" : text;

    if (currentStep.type === "repeatable") {
      const section = currentStep.key;
      const fieldKey = currentStep.fields[store.fieldStep].key;
      const index = store.repeatIndex[section] || 0;
      store.updateAnswer(fieldKey, answerValue, section, index);

      // Sync to main resume store
      updateForm({
        [section]: store.answers[section],
      });
    } else {
      store.updateAnswer(currentStep.key, answerValue);
      // Sync to main resume store
      updateForm({
        [currentStep.key]: answerValue,
      });
    }
  };

  const moveToNextStep = () => {
    const nextStep = store.step + 1;
    if (nextStep < flow.length) {
      store.setStep(nextStep);
      const nextQuestion = flow[nextStep].q;
      addBotMessage(nextQuestion);
    } else {
      finishResume();
    }
  };

  const moveToNextField = () => {
    const nextField = store.fieldStep + 1;
    if (nextField < currentStep.fields.length) {
      store.setFieldStep(nextField);
      const nextFieldData = currentStep.fields[nextField];
      addBotMessage(nextFieldData.q);
    } else {
      store.setFieldStep(0);
      addBotMessage(
        `Would you like to add another ${currentStep.key}? (Yes/No)`,
      );
    }
  };

  const handleRepeatableSection = (answer) => {
    const isFirstField = store.fieldStep === 0;
    const answerLower = answer.toLowerCase();

    // Logic for "Yes/No" to start/continue repeatable section
    const lastBotMsg = store.messages[store.messages.length - 1];
    const isAskingToRepeat =
      lastBotMsg?.text?.includes("add another") ||
      lastBotMsg?.text?.includes("Add another");

    if (
      isAskingToRepeat ||
      (isFirstField &&
        currentStep.type === "repeatable" &&
        (answerLower === "yes" || answerLower === "no"))
    ) {
      if (answerLower === "no") {
        moveToNextStep();
        return true;
      }
      if (answerLower === "yes") {
        if (isAskingToRepeat) {
          store.updateRepeatIndex(currentStep.key);
        }
        addBotMessage(currentStep.fields[0].q);
        return true;
      }
    }

    return false;
  };

  const handleInput = (text) => {
    if (!text.trim()) return;

    addUserMessage(text); // Optimistic UI update

    // Check repeatable logic
    if (handleRepeatableSection(text)) {
      setInput("");
      return;
    }

    // Save & Move
    saveAnswer(text);

    if (currentStep.type === "repeatable") {
      moveToNextField();
    } else {
      moveToNextStep();
    }

    setInput("");
  };

  const finishResume = async () => {
    addBotMessage(
      "🎉 Awesome! I'm compiling your resume now using our AI engine... This might take a few seconds.",
    );
    setIsGenerating(true);
    setError(false);
    try {
      const res = await axios.post("/api/gen/aiResume", {
        resumeData: store.answers,
      });
      const data = res?.data;

      resetForm();
      clearDraft();
      updateForm(data?.data);

      router.push("/dashboard/full-ai-resume/preview");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.log(error);
      setIsGenerating(false);
      setError(true);
      addBotMessage("Review generation failed. Please try again.");
    }
  };

  // Initial Message
  useEffect(() => {
    if (store.messages.length === 0) {
      addBotMessage(
        "Hi there! I'm your AI Resume Assistant. I'll help you build a professional resume in minutes. Let's start with your *Full Name*.",
      );
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store.messages, store.isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput(input);
  };

  const handleQuickReply = (val) => {
    handleInput(val);
  };

  // --- Render ---
  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* Left Sidebar - Context & Tips (Hidden on Mobile) */}
      <div className="hidden lg:flex w-80 flex-col border-r border-slate-200 bg-white h-full p-6" id="tour-chat-sidebar">
        <div className="bg-linear-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg">AI Assistant</h2>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed">
            I'm here to guide you through building a ATS-friendly resume. I'll
            ask you questions one by one.
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-indigo-50">
            <span>
              Step {store.step + 1} of {flow.length}
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white">
              {Math.round(((store.step + 1) / flow.length) * 100)}%
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Quick Tips
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
              <p>
                Keep your answers concise and professional. Use action verbs
                like "Managed", "Created", "Led".
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
              <p>
                If you don't have information for a section, you can type
                "Skip".
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            store.resetStore();
            resetForm();
            clearDraft();
            window.location.reload();
          }}
          className="mt-4 flex items-center justify-center gap-2 text-slate-500 hover:text-red-600 text-sm font-medium transition-colors p-2"
          id="tour-reset-chat"
        >
          <RotateCcw className="w-4 h-4" /> Reset Chat
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth"
          id="tour-chat-container"
        >
          <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end pb-4">
            {store.messages.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                onQuickReply={handleQuickReply}
              />
            ))}
            {store.isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-sm p-4 animate-pulse">
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto">
            {error ? (
              <button
                onClick={finishResume}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retry Generation
              </button>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white shadow-sm transition-all"
                  disabled={isGenerating || store.isTyping}
                  autoFocus
                  id="tour-chat-input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isGenerating}
                  className={`absolute right-2 p-2 rounded-full transition-all duration-200 ${
                    input.trim()
                      ? "bg-indigo-600 text-white shadow-md hover:scale-105"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}
            <div className="mt-3 flex justify-center gap-4 text-xs text-slate-400">
              <span>Press Enter to send</span>
              <span>•</span>
              <span>Type "Skip" to pass</span>
            </div>
          </div>
        </div>
      </div>
      <Tour
        steps={[
          {
            target: "#tour-chat-sidebar",
            content: "This is your AI companion's dashboard, showing your current progress.",
            disableBeacon: true,
          },
          {
            target: "#tour-chat-container",
            content: "This is where the conversation happens. Answer the bot's questions to build your resume.",
          },
          {
            target: "#tour-chat-input",
            content: "Type your answers here. You can also type 'Skip' if you don't have information for a section.",
          },
          {
            target: "#tour-reset-chat",
            content: "Need to start over? You can reset the entire conversation here.",
          },
        ]}
        tourId="ai-chat-resume"
      />
    </div>
  );
}
