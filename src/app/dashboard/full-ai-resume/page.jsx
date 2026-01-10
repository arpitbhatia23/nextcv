"use client";
import { useState } from "react";
import { Send, Sparkles, CheckCircle } from "lucide-react";
import axios from "axios";

export default function ResumeChat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome! I'm your AI Resume Assistant. Let's create an amazing resume together!What is your full name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobRole: "",
    contact: "",
    skills: "",
    certifications: "",
    experiences: [],
    projects: [],
    education: [],
  });

  const [step, setStep] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [educationIndex, setEducationIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const flow = [
    { key: "fullName", question: "What is your full name?" },
    {
      key: "email",
      question: "What's your email?",
    },
    {
      key: "phone",
      question: "What's your phone number?",
    },
    {
      key: "address",
      question: "What's your address?",
    },
    { key: "jobRole", question: "What job role are you targeting?" },

    // Experience Section
    {
      key: "hasExperience",
      question: "Do you have work experience? (Yes/No)",
      type: "boolean",
    },
    { key: "companyName", question: "Company name" },
    { key: "position", question: "Your position/title" },
    {
      key: "experienceDuration",
      question: "Duration (e.g., Jan 2020 - Dec 2022)",
    },
    {
      key: "responsibilities",
      question:
        "Key responsibilities and achievements (separate with semicolons)",
    },
    {
      key: "anotherExperience",
      question: "Add another work experience? (Yes/No)",
      type: "boolean",
      loop: "experience",
    },

    // Projects Section
    {
      key: "hasProjects",
      question: "Do you have any projects to showcase? (Yes/No)",
      type: "boolean",
    },
    { key: "projectName", question: "Project name" },
    { key: "projectDescription", question: "Project description" },
    { key: "projectTech", question: "Technologies used" },
    {
      key: "projectGithub",
      question: "GitHub link (optional, type 'skip' if none)",
    },
    {
      key: "projectLive",
      question: "Live demo link (optional, type 'skip' if none)",
    },
    {
      key: "anotherProject",
      question: "Add another project? (Yes/No)",
      type: "boolean",
      loop: "project",
    },

    // Education Section
    {
      key: "hasEducation",
      question: "Add education details? (Yes/No)",
      type: "boolean",
    },
    { key: "degree", question: "Degree" },
    { key: "institution", question: "Institution" },
    { key: "graduationYear", question: "Year of completion" },
    {
      key: "anotherEducation",
      question: "Add another education? (Yes/No)",
      type: "boolean",
      loop: "education",
    },

    { key: "skills", question: "List your key skills (comma separated)" },
  ];
  const handleInput = (text) => {
    // Keep a local snapshot of answers so we can reliably submit the very
    // last input even though setState is async.
    const answersSnapshot = {
      ...answers,
      experiences: JSON.parse(JSON.stringify(answers.experiences || [])),
      projects: JSON.parse(JSON.stringify(answers.projects || [])),
      education: JSON.parse(JSON.stringify(answers.education || [])),
    };
    setMessages((prev) => [...prev, { sender: "user", text }]);
    let currentStep = flow[step];

    // Handle boolean navigation
    if (currentStep.type === "boolean") {
      if (text.toLowerCase() === "no") {
        let nextStepIndex = -1;

        if (currentStep.key === "hasExperience") {
          nextStepIndex = flow.findIndex((f) => f.key === "hasProjects");
        } else if (currentStep.key === "hasProjects") {
          nextStepIndex = flow.findIndex((f) => f.key === "hasEducation");
        } else if (currentStep.key === "hasEducation") {
          nextStepIndex = flow.findIndex((f) => f.key === "skills");
        } else if (currentStep.key === "anotherExperience") {
          nextStepIndex = flow.findIndex((f) => f.key === "hasProjects");
        } else if (currentStep.key === "anotherProject") {
          nextStepIndex = flow.findIndex((f) => f.key === "hasEducation");
        } else if (currentStep.key === "anotherEducation") {
          nextStepIndex = flow.findIndex((f) => f.key === "skills");
        }

        if (nextStepIndex !== -1) {
          setStep(nextStepIndex);
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: flow[nextStepIndex].question },
          ]);
          return setInput("");
        }
      }
    }

    // Save answers based on category
    if (
      [
        "companyName",
        "position",
        "experienceDuration",
        "responsibilities",
      ].includes(currentStep.key)
    ) {
      const updatedExperiences = [...answers.experiences];
      if (!updatedExperiences[experienceIndex])
        updatedExperiences[experienceIndex] = {};
      updatedExperiences[experienceIndex][currentStep.key] = text;
      answersSnapshot.experiences = updatedExperiences;
      setAnswers((prev) => ({ ...prev, experiences: updatedExperiences }));
    } else if (
      [
        "projectName",
        "projectDescription",
        "projectTech",
        "projectGithub",
        "projectLive",
      ].includes(currentStep.key)
    ) {
      const updatedProjects = [...answers.projects];
      if (!updatedProjects[projectIndex]) updatedProjects[projectIndex] = {};
      updatedProjects[projectIndex][currentStep.key] =
        text.toLowerCase() === "skip" ? "" : text;
      answersSnapshot.projects = updatedProjects;
      setAnswers((prev) => ({ ...prev, projects: updatedProjects }));
    } else if (
      ["degree", "institution", "graduationYear"].includes(currentStep.key)
    ) {
      const updatedEducation = [...answers.education];
      if (!updatedEducation[educationIndex])
        updatedEducation[educationIndex] = {};
      updatedEducation[educationIndex][currentStep.key] = text;
      answersSnapshot.education = updatedEducation;
      setAnswers((prev) => ({ ...prev, education: updatedEducation }));
    } else {
      answersSnapshot[currentStep.key] = text;
      setAnswers((prev) => ({ ...prev, [currentStep.key]: text }));
    }

    // Handle loop logic
    if (currentStep.loop && text.toLowerCase() === "yes") {
      let nextKey = "";

      if (currentStep.loop === "experience") {
        setExperienceIndex((prev) => prev + 1);
        nextKey = "companyName";
      } else if (currentStep.loop === "project") {
        setProjectIndex((prev) => prev + 1);
        nextKey = "projectName";
      } else if (currentStep.loop === "education") {
        setEducationIndex((prev) => prev + 1);
        nextKey = "degree";
      }

      const nextIndex = flow.findIndex((f) => f.key === nextKey);
      setStep(nextIndex);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: flow[nextIndex].question },
      ]);
      return setInput("");
    }

    // Move to next step
    if (step + 1 >= flow.length) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "✨ Perfect! Your resume is ready. Generating preview...",
        },
      ]);
      setIsComplete(true);
      submitAllData(answersSnapshot);
    } else {
      setStep((prev) => prev + 1);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: flow[step + 1].question },
      ]);
    }

    setInput("");
  };

  const submitAllData = async (data) => {
    // Simulate API call; accept a snapshot `data` to ensure last input is included
    const payload = data || answers;

    try {
      // localStorage.setItem("polishedResume", JSON.stringify(payload));

      const res = await axios.post("/api/gen/aiResume", {
        resumeData: payload,
      });

      console.log(res.data);
    } catch (e) {
      // ignore localStorage errors in restricted environments
    }
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "🎉 Resume generated successfully! You can now preview and download it.",
      },
    ]);
  };

  const sendMessage = () => {
    if (input.trim()) handleInput(input.trim());
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-linear-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
              <Sparkles className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                AI Resume Assistant
              </h1>
              <p className="text-gray-500 text-sm">
                Let's build your professional resume together
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((step / flow.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / flow.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-125 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-gray-50 to-white">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "bot" ? "justify-start" : "justify-end"} animate-fade-in`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      m.sender === "bot"
                        ? "bg-linear-to-br from-blue-500 to-purple-600"
                        : "bg-linear-to-br from-green-500 to-emerald-600"
                    }`}
                  >
                    {m.sender === "bot" ? (
                      <Sparkles className="text-white" size={16} />
                    ) : (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      m.sender === "bot"
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-linear-to-r from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                className="flex-1 border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={
                  isComplete ? "Resume completed!" : "Type your answer..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isComplete}
              />
              <button
                onClick={sendMessage}
                disabled={isComplete || !input.trim()}
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
            <li>• Be specific with your achievements and responsibilities</li>
            <li>• Use semicolons (;) to separate multiple items in lists</li>
            <li>• Type 'skip' for optional fields you want to leave blank</li>
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
