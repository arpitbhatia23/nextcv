import React from "react";
import { User, Sparkles } from "lucide-react";

export const ChatMessage = ({ message, onQuickReply }) => (
  <div
    className={`flex w-full mb-6 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${
        message.sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110 ${
          message.sender === "user"
            ? "bg-indigo-600 text-white"
            : "bg-white border border-slate-200 text-indigo-600"
        }`}
      >
        {message.sender === "user" ? (
          <User className="w-5 h-5" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
      </div>

      {/* Message Bubble container */}
      <div
        className={`flex flex-col gap-2 ${message.sender === "user" ? "items-end" : "items-start"}`}
      >
        <div
          className={`p-4 shadow-sm text-sm md:text-base leading-relaxed transition-all duration-300 ${
            message.sender === "user"
              ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
              : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm"
          }`}
        >
          {message.text}
        </div>

        {/* Quick Replies */}
        {message.options && (
          <div
            className={`flex flex-wrap gap-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-500`}
          >
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onQuickReply && onQuickReply(option)}
                className="px-5 py-2.5 bg-white border border-indigo-100 text-indigo-600 text-xs font-semibold rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-md transition-all active:scale-95 duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
