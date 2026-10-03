"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, User, MessageSquare } from "lucide-react";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const AdminFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.post("/api/feedback/get");
        if (res.data.success) {
          setFeedbacks(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F8F7F3] px-3 py-4 sm:px-6">
        <FontImports />
        <div className="rounded-2xl border border-[#E3E2DC] bg-white p-10 text-center shadow-xs">
          <p className="font-mono text-xs text-[#66706B] tracking-wider animate-pulse">
            RETRIEVING FEEDBACK ENTRIES&hellip;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F3] px-3 py-4 sm:px-6 space-y-4">
      <FontImports />

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-[#E3E2DC]">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-[#465B9E] mb-1">
            USER VOICE &amp; SENTIMENT
          </div>
          <h2 className="font-display text-2xl font-medium text-[#17201C]">User Feedback</h2>
        </div>
        <span className="font-mono text-xs text-[#8A908B] px-2.5 py-1 rounded-full bg-white border border-[#E3E2DC]">
          {feedbacks.length} {feedbacks.length === 1 ? "ENTRY" : "ENTRIES"}
        </span>
      </div>

      {feedbacks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#C8CDD9] bg-white p-12 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#EEF0F7] text-[#465B9E] flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <p className="font-sans text-sm text-[#5B625C]">No feedback entries recorded yet.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E3E2DC] bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)] overflow-hidden divide-y divide-[#E3E2DC]">
          {feedbacks.map(item => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 transition-colors hover:bg-[#F8F7F3]/40"
            >
              <div className="flex items-start gap-3 sm:min-w-48 shrink-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF0F7] border border-[#C8CDD9] text-[#465B9E]">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate text-[#17201C]">
                    {item.userId?.name || "Anonymous"}
                  </p>
                  <p className="font-mono text-[10px] text-[#8A908B] mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        item.rating >= star
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-[#E3E2DC]"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-mono font-medium text-[#5B625C] ml-1.5">
                    {item.rating}/5
                  </span>
                </div>
                {item.comment && (
                  <p className="font-display text-sm italic text-[#17201C] leading-relaxed">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackList;
