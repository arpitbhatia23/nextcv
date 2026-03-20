"use client";

import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";

const FeedbackModal = ({ isOpen, onClose, resumeId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = ["Easy to use", "Good templates", "AI helped me", "Saved time", "Clean design"];

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post("/api/feedback/submit", {
        rating,
        comment,
        resumeId,
      });

      toast.success("Thanks for your feedback 🙌");

      resetForm();
      onClose();
    } catch (error) {
      console.error("Feedback error:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg">
          {/* Title */}
          <div className="text-center mb-2">
            <DialogPrimitive.Title className="text-lg font-semibold">
              🎉 Your resume is ready!
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="text-sm text-gray-500">
              What did you like most about NextCV?
            </DialogPrimitive.Description>
          </div>

          {/* Stars */}
          <div className="flex justify-center py-4 gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    (hoverRating || rating) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Quick options (only for good ratings) */}
          {rating >= 4 && (
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setComment(opt)}
                  className="px-3 py-1 border rounded-full text-xs hover:bg-gray-100"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Textarea */}
          {rating > 0 && (
            <Textarea
              placeholder={
                rating >= 4
                  ? "What did you like most? (optional)"
                  : "What went wrong? Help us improve"
              }
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="min-h-20"
            />
          )}

          {/* Privacy */}
          <p className="text-xs text-gray-400 text-center mt-2">
            We respect your privacy. No personal data is shared.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isSubmitting}
            >
              Skip
            </Button>

            <Button onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit (10 sec)"}
            </Button>
          </div>

          {/* Close */}
          <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default FeedbackModal;
