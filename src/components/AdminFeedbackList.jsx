"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
    return <div className="p-4 text-center">Loading feedback...</div>;
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No feedback yet.</p>
          ) : (
            feedbacks.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-slate-50/50"
              >
                <div className="flex items-start gap-3 min-w-[150px]">
                   <div className="bg-white p-2 rounded-full border">
                      <User className="w-4 h-4 text-slate-500" />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.userId?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                   </div>
                </div>
                
                <div className="flex-1 space-y-2">
                   <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            item.rating >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          )}
                        />
                      ))}
                   </div>
                   {item.comment && (
                     <p className="text-sm text-slate-700 italic">
                       "{item.comment}"
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
