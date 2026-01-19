"use client";
import { useState, useEffect, useRef } from "react";
import { Send, RefreshCw } from "lucide-react";
// Resume flow configuration
import { flow } from "@/utils/resumeFlow";
import { useAutoScroll } from "@/hooks/useAutoscroll";
import { ChatMessage } from "@/components/Chat";
import axios from "axios";
import { useResumeStoreChat } from "@/store/chatStore";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
// Constants
const RESPONSE_DELAY = 300;

// Main Component
export default function ResumeChat() {
  // State Management
  const store = useResumeStoreChat();
  const updateFrom = useResumeStore((state) => state.updateForm);
  const From = useResumeStore((state) => state.formData);
  const resetForm = useResumeStore((state) => state.resetForm);
  const clearDraft = useResumeStore((state) => state.clearStorage);

  const [input, setInput] = useState("");
  const [showYesNo, setShowYesNo] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const currentStep = flow[store.step];
  const [isGenerating, setIsGenerating] = useState(false);
  const bottomRef = useAutoScroll(store.messages.length);

  const router = useRouter();
  // Helper Functions
  const isOptionalField = (fieldQuestion) => {
    return fieldQuestion?.toLowerCase().includes("optional");
  };

  const addBotMessage = (text, delay = RESPONSE_DELAY) => {
    setTimeout(() => {
      store.addMessage({ sender: "bot", text });
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
    } else {
      store.updateAnswer(currentStep.key, answerValue);
    }
  };

  const moveToNextStep = () => {
    const nextStep = store.step + 1;
    if (nextStep < flow.length) {
      store.setStep(nextStep);
      const nextQuestion = flow[nextStep].q;
      addBotMessage(nextQuestion);
      setShowYesNo(flow[nextStep]?.type === "repeatable");
      setShowSkip(isOptionalField(nextQuestion));
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
      setShowSkip(isOptionalField(nextFieldData.q));
    } else {
      store.setFieldStep(0);
      setShowYesNo(true);
      addBotMessage(`Add another ${currentStep.key}?`);
    }
  };

  const handleRepeatableSection = (answer) => {
    const isFirstField = store.fieldStep === 0;
    const answerLower = answer.toLowerCase();

    if (isFirstField && currentStep.type === "repeatable") {
      if (answerLower === "no") {
        resetUIState();
        moveToNextStep();
        return true;
      }
      if (answerLower === "yes") {
        addBotMessage(currentStep.fields[0].q);
        setShowSkip(isOptionalField(currentStep.fields[0].q));
        return true;
      }
    }

    // "Add another?" question
    if (isFirstField && answerLower === "yes") {
      store.updateRepeatIndex(currentStep.key);
      addBotMessage(currentStep.fields[0].q);
      setShowSkip(isOptionalField(currentStep.fields[0].q));
      return true;
    }

    if (isFirstField && answerLower === "no") {
      resetUIState();
      moveToNextStep();
      return true;
    }

    return false;
  };

  const resetUIState = () => {
    setShowYesNo(false);
    setShowSkip(false);
  };

  // Main Input Handler
  const handleInput = (text) => {
    addUserMessage(text);
    resetUIState();

    // Check if it's a repeatable section flow
    if (handleRepeatableSection(text)) {
      return;
    }

    // Save answer and move to next
    saveAnswer(text);

    if (currentStep.type === "repeatable") {
      moveToNextField();
    } else {
      moveToNextStep();
    }
  };

  const handleButtonClick = (answer) => {
    if (input.trim()) return; // Prevent double submission
    handleInput(answer);
    setInput("");
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      handleInput(input.trim());
      setInput("");
    }
  };

  const finishResume = async () => {
    store.setIsComplete(true);
    store.setApiError(null);
    resetUIState();
    setIsGenerating(true);

    addBotMessage("✨ Resume complete! Generating preview...");

    try {
      // Simulated API call - replace with your actual endpoint
      const response = await axios.post("/api/gen/aiResume", {
        resumeData: store.answers,
      });

      const data = response.data;
      console.log(data);
      store.setGeneratedResumeUrl(data.url || null);
      store.addMessage({
        sender: "bot",
        text: "🎉 Resume generated successfully! You can now download your resume.",
      });
      resetForm();
      clearDraft();
      updateFrom(data?.data);
      console.log(From);
      router.push("/dashboard/full-ai-resume/preview");
    } catch (error) {
      console.error("Resume generation error:", error);
      store.setApiError(error.message);
      store.addMessage({
        sender: "bot",
        text: "❌ Oops! Something went wrong while generating your resume. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    store.setApiError(null);
    finishResume();
  };

  const handleStartOver = () => {
    if (
      confirm("Are you sure you want to start over? All progress will be lost.")
    ) {
      store.resetStore();
      setInput("");
      resetUIState();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
          <button
            onClick={handleStartOver}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Start Over
          </button>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-gray-50 to-white">
            {store.messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                message={msg}
                isLatest={idx === store.messages.length - 1}
                showYesNo={showYesNo && !store.isComplete}
                showSkip={showSkip && !store.isComplete}
                showRetry={
                  !!store.apiError && idx === store.messages.length - 1
                }
                onRetry={handleRetry}
                onButtonClick={handleButtonClick}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            {store.apiError && (
              <div className="mb-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
                <span className="text-red-800 text-sm">
                  Failed to generate resume
                </span>
                <button
                  onClick={handleRetry}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={isGenerating ? "animate-spin" : ""}
                  />
                  Try Again
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <input
                className="flex-1 border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={
                  store.isComplete ? "Resume completed!" : "Type your answer..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={store.isComplete}
              />
              <button
                onClick={handleSendMessage}
                disabled={store.isComplete || !input.trim()}
                className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Quick Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your progress is automatically saved</li>
            <li>• Be specific with your achievements and responsibilities</li>
            <li>• Use semicolons (;) to separate multiple items in lists</li>
            <li>• Click 'Skip' button or type 'skip' for optional fields</li>
            <li>• Use the Yes/No buttons for quick responses</li>
            <li>
              • You can add multiple experiences, projects, and education
              entries
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
