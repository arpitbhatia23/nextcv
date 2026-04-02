"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResumeStoreChat } from "@/store/chatStore";
import { ChatMessage } from "@/shared/components/Chat";
import { Sparkles, Lightbulb, RotateCcw, Loader2, Menu, X, ArrowRight, Ban } from "lucide-react";
import { flow } from "@/shared/utils/resumeFlow";
import useResumeStore from "@/store/useResumeStore";
import axios from "axios";
import confetti from "canvas-confetti";

const RESPONSE_DELAY = 1000;

export default function ResumeChat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const store = useResumeStoreChat();
  const updateForm = useResumeStore(state => state.updateForm);
  const resetForm = useResumeStore(state => state.resetForm);
  const clearDraft = useResumeStore(state => state.clearStorage);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);
  const chatEndRef = useRef(null);
  const router = useRouter();
  const ischatEnable = process.env.NEXT_PUBLIC_ENABLE_CHAT === "true";
  const addBotMessage = (text, options = null, delay = RESPONSE_DELAY) => {
    store.setIsTyping(true);
    setTimeout(() => {
      store.addMessage({ sender: "bot", text, options });
      store.setIsTyping(false);
    }, delay);
  };
  // --- State & Stores ---
  // Initial Message
  useEffect(() => {
    if (!ischatEnable) return;
    if (store.messages.length === 0) {
      addBotMessage(
        "Hi there! I'm your AI Resume Assistant. I'll help you build a professional resume in minutes. Let's start with your *Full Name*."
      );
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (!ischatEnable) return;

    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store.messages, store.isTyping]);

  if (ischatEnable) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm mb-4">🚧 Feature Update</div>

        <h2 className="text-3xl font-bold mb-3">Chat-Based AI Resume Builder</h2>

        <p className="text-gray-500 max-w-lg leading-relaxed">
          We're upgrading this feature to deliver faster responses and more accurate resume
          optimization. It will be available again very soon.
        </p>

        <button
          onClick={() => (window.location.href = "/dashboard/resumeform")}
          className="mt-6 px-5 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          Use Classic Resume Builder
        </button>
      </div>
    );
  }
  const currentStep = flow[store.step];

  // --- Logic ---

  const addUserMessage = text => {
    store.addMessage({ sender: "user", text });
  };

  const saveAnswer = text => {
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

      // If next step is repeatable, ask the initial question with Yes/No options
      if (flow[nextStep].type === "repeatable") {
        addBotMessage(nextQuestion, ["Yes", "No"]);
      } else {
        addBotMessage(nextQuestion);
      }
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
      addBotMessage(`Would you like to add another ${currentStep.key}?`, ["Yes", "No"]);
    }
  };

  const handleRepeatableSection = answer => {
    const isFirstField = store.fieldStep === 0;
    const answerLower = answer.toLowerCase();

    // Logic for "Yes/No" to start/continue repeatable section
    const lastBotMsg = store.messages[store.messages.length - 1];
    const isAskingToRepeat =
      lastBotMsg?.text?.includes("add another") ||
      lastBotMsg?.text?.includes("Add another") ||
      lastBotMsg?.text === currentStep.q;

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
        if (
          lastBotMsg?.text?.includes("add another") ||
          lastBotMsg?.text?.includes("Add another")
        ) {
          store.updateRepeatIndex(currentStep.key);
        }
        addBotMessage(currentStep.fields[0].q);
        return true;
      }
    }

    return false;
  };

  const handleInput = text => {
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
      if (currentStep.key === "fullName") {
        // Add a nice welcoming follow up if it's the first step
        addBotMessage(`Nice to meet you, ${text}! Let's keep going.`);
        setTimeout(() => moveToNextStep(), 800);
      } else {
        moveToNextStep();
      }
    }

    setInput("");
  };

  const finishResume = async () => {
    addBotMessage(
      "🎉 Awesome! I'm compiling your resume now using our AI engine... This might take a few seconds."
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
      setIsGenerating(false);
      setError(true);
      addBotMessage("Review generation failed. Please try again.");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleInput(input);
  };

  const handleQuickReply = val => {
    handleInput(val);
  };

  const progress = Math.round((store.step / flow.length) * 100);

  // --- Render ---
  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden relative">
      {/* Mobile Header with Menu */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800">AI Resume Assistant</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Left Sidebar - Context & Tips */}
      <div
        className={`fixed inset-0 lg:static lg:flex w-80 flex-col border-r border-slate-200 bg-white h-full p-6 z-30 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        id="tour-chat-sidebar"
      >
        <div className="bg-linear-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
            <Sparkles className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg">AI Assistant</h2>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed mb-6">
            I'm here to guide you through building a ATS-friendly resume. I'll ask you questions one
            by one.
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-100">
              <span>Progress bar</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] text-indigo-200 mt-1">
              Step {store.step + 1} of {flow.length}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Quick Tips
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
              <p>
                Keep your answers concise and professional. Use action verbs like "Managed",
                "Created", "Led".
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
              <p>
                If you don't have information for a section, you can click the "Skip" button below.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-indigo-700 font-medium">
              <p>💡 Did you know? AI will automatically format your points to be ATS-friendly.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm("Are you sure you want to reset? All progress will be lost.")) {
              store.resetStore();
              resetForm();
              clearDraft();
              window.location.reload();
            }
          }}
          className="mt-4 flex items-center justify-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-all"
          id="tour-reset-chat"
        >
          <RotateCcw className="w-4 h-4" /> Reset Chat
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative pt-14 lg:pt-0">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar"
          id="tour-chat-container"
        >
          <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end pb-4">
            {store.messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} onQuickReply={handleQuickReply} />
            ))}
            {store.isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-sm p-4">
                <div className="flex gap-1.5 bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_0ms]" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_150ms]" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_300ms]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
          <div className="max-w-3xl mx-auto">
            {error ? (
              <button
                onClick={finishResume}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retry Generation
              </button>
            ) : (
              <div className="space-y-4">
                {/* Options / Action Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleInput("Skip")}
                    disabled={isGenerating || store.isTyping}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    <Ban className="w-3.5 h-3.5" /> Skip Section
                  </button>

                  {/* If we have special options from flow, we could show them here too */}
                </div>

                <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={store.isTyping ? "AI is thinking..." : "Type your answer..."}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white shadow-sm transition-all"
                      disabled={isGenerating || store.isTyping}
                      autoFocus
                      id="tour-chat-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isGenerating}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      input.trim()
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <ArrowRight className="w-6 h-6" />
                    )}
                  </button>
                </form>
              </div>
            )}
            <div className="mt-4 flex justify-center gap-4 text-[10px] md:text-xs text-slate-400 font-medium tracking-wide">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">
                  Enter
                </kbd>{" "}
                to send
              </span>
              <span className="text-slate-200">•</span>
              <span className="flex items-center gap-1">
                Click{" "}
                <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Skip
                </span>{" "}
                to pass
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-25 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* <Tour
          steps={[
            {
              target: "#tour-chat-sidebar",
              content:
                "This is your AI companion's dashboard, showing your current progress.",
              disableBeacon: true,
            },
            {
              target: "#tour-chat-container",
              content:
                "This is where the conversation happens. Answer the bot's questions to build your resume.",
            },
            {
              target: "#tour-chat-input",
              content:
                "Type your answers here or click suggested buttons. You can also click 'Skip' if you don't have certain details.",
            },
            {
              target: "#tour-reset-chat",
              content:
                "Need to start over? You can reset the entire conversation here.",
            },
          ]}
          tourId="ai-chat-resume"
        /> */}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
