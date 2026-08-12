"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, User } from "lucide-react";

/* Fonts match the Correspondence Archive letterhead:
   Fraunces for display type, IBM Plex Mono for labels / codes. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const INK = "#1C2333";
const RUST = "#B3382C";
const PAPER = "#F7F7F5";
const LINE = "#E4E2DC";
const MUTE = "#6B7280";
const FAINT = "#B7B5AC";

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
      <div style={{ backgroundColor: PAPER }} className="px-3 py-6 sm:px-4 lg:px-6">
        <FontImports />
        <div
          className="border p-10 text-center"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
            RETRIEVING CORRESPONDENCE&hellip;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: PAPER }} className="px-3 py-6 sm:px-4 lg:px-6">
      <FontImports />

      {/* Letterhead */}
      <div
        className="mb-6 pb-5 border-b-2 flex flex-wrap items-end justify-between gap-4"
        style={{ borderColor: INK }}
      >
        <div>
          <div className="font-mono text-[11px] tracking-widest mb-2" style={{ color: RUST }}>
            READER CORRESPONDENCE
          </div>
          <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
            Recent Feedback
          </h1>
        </div>
        <span className="font-mono text-[11px] tracking-widest" style={{ color: FAINT }}>
          {feedbacks.length} {feedbacks.length === 1 ? "ENTRY" : "ENTRIES"}
        </span>
      </div>

      {feedbacks.length === 0 ? (
        <div
          className="border p-10 text-center"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <p className="font-mono text-[11px] tracking-widest" style={{ color: FAINT }}>
            NO FEEDBACK ON FILE
          </p>
        </div>
      ) : (
        <div className="border divide-y" style={{ borderColor: LINE }}>
          {feedbacks.map(item => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 transition-colors hover:bg-[#FBFBF9]"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="flex items-start gap-3 sm:min-w-40">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center border"
                  style={{ borderColor: LINE, backgroundColor: PAPER }}
                >
                  <User className="w-3.5 h-3.5" style={{ color: MUTE }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: INK }}>
                    {item.userId?.name || "Anonymous"}
                  </p>
                  <p
                    className="font-mono text-[10px] tracking-widest mt-0.5"
                    style={{ color: FAINT }}
                  >
                    {new Date(item.createdAt)
                      .toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })
                      .toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className="w-3.5 h-3.5"
                      style={
                        item.rating >= star
                          ? { fill: RUST, color: RUST }
                          : { fill: "transparent", color: LINE }
                      }
                    />
                  ))}
                </div>
                {item.comment && (
                  <p
                    className="font-display text-sm italic line-clamp-2"
                    style={{ color: "#3F4657" }}
                  >
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
