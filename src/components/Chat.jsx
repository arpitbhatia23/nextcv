import React from "react";
import { User, Sparkles } from "lucide-react";

export const ChatMessage = ({ message, onQuickReply }) => (
  <div
    className={`flex w-full mb-6 ${
      message.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
       {/* Avatar */}
       <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          message.sender === "user" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-indigo-600"
       }`}>
          {message.sender === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
       </div>

       {/* Message Bubble */}
       <div className="flex flex-col gap-2">
          <div
             className={`p-4 shadow-sm text-sm leading-relaxed ${
               message.sender === "user"
                 ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
                 : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm"
             }`}
           >
             {message.text}
           </div>
           
           {/* Quick Replies */}
           {message.options && (
             <div className="flex flex-wrap gap-2 mt-1">
               {message.options.map((option, index) => (
                 <button
                   key={index}
                   onClick={() => onQuickReply && onQuickReply(option)}
                   className="px-4 py-2 bg-white border border-indigo-100 text-indigo-600 text-xs font-medium rounded-full hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
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
