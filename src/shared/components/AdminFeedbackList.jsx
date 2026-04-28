"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Star, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";

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
    return <div className="p-4 text-center text-xs sm:text-sm text-slate-400">Loading feedback...</div>;
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border border-slate-100 shadow-sm">
      <CardHeader className="px-4 sm:px-5 pt-4 sm:pt-5 pb-2 sm:pb-3">
        <CardTitle className="text-xs sm:text-sm font-semibold text-slate-700">
          Recent User Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 pb-4">
        <div className="space-y-2 sm:space-y-3">
          {feedbacks.length === 0 ? (
            <p className="text-xs sm:text-sm text-slate-400 text-center py-6">No feedback yet.</p>
          ) : (
            feedbacks.map(item => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-2 sm:gap-3 sm:min-w-36">
                  <div className="bg-white p-1.5 rounded-full border border-slate-200 flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                      {item.userId?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={cn(
                          "w-3 h-3 sm:w-3.5 sm:h-3.5",
                          item.rating >= star ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                        )}
                      />
                    ))}
                  </div>
                  {item.comment && (
                    <p className="text-xs sm:text-sm text-slate-600 italic line-clamp-2">
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFeedbackList;
