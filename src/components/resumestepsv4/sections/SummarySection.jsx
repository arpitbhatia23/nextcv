"use client";
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  BrainCircuit,
  Sparkles,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";

const SummarySection = forwardRef(({}, ref) => {
  const formData = useResumeStore((s) => s.formData);
  const updateForm = useResumeStore((s) => s.updateForm);
  const [isGenerating, setIsGenerating] = useState(false);

  const schema = z.object({
    summary: z
      .string()
      .min(20, { message: "Summary should be at least 20 characters" }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: formData.summary || "",
    },
  });

  const watchedSummary = useWatch({ control: form.control, name: "summary" });

  useEffect(() => {
    updateForm({ summary: watchedSummary });
  }, [watchedSummary]);

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await form.trigger();
      return isValid;
    }
  }));

  const handleAiGeneration = async () => {
    try {
      setIsGenerating(true);
      const res = await axios.post("/api/gen/description", {
        type: "summary",
        data: { ...formData, summary: watchedSummary },
      });

      if (res.data?.data) {
        form.setValue("summary", String(res.data.data));
        toast.success("AI Summary synthesized!");
      }
    } catch (err) {
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm border-slate-100 bg-white rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                      <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-sm">
                        <AlignLeft className="w-4 h-4 text-indigo-500" />
                        Executive Profile
                      </FormLabel>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-all h-8 px-3 text-xs font-bold"
                        disabled={isGenerating}
                        onClick={handleAiGeneration}
                      >
                        <Sparkles
                          className={`w-3 h-3 mr-1.5 ${isGenerating ? "animate-spin" : ""}`}
                        />
                        {isGenerating ? "Synthesizing..." : "Generate AI"}
                      </Button>
                    </div>

                    <div className="relative group">
                      <FormControl>
                        <Textarea
                          placeholder="Write your professional summary here..."
                          rows={6}
                          {...field}
                          className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all resize-none p-4 text-sm leading-relaxed shadow-inner"
                        />
                      </FormControl>

                      <AnimatePresence>
                        {isGenerating && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 z-10"
                          >
                            <div className="relative">
                              <div className="w-10 h-10 border-2 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                              <BrainCircuit className="absolute inset-0 m-auto w-4 h-4 text-indigo-600 animate-pulse" />
                            </div>
                            <p className="font-bold text-indigo-600 uppercase tracking-widest text-[10px]">
                              Processing
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="mt-4 flex items-center justify-between text-slate-400">
            <div className="flex gap-1.5 items-center">
              <CheckCircle2
                className={`w-4 h-4 transition-colors ${watchedSummary?.length >= 50 ? "text-emerald-500" : "text-slate-300"}`}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Strength:{" "}
                {watchedSummary?.length < 50
                  ? "Needs detail"
                  : watchedSummary?.length < 150
                    ? "Good"
                    : "Impactful"}
              </span>
            </div>
            <span className="text-xs font-bold">
              {watchedSummary?.length || 0} Chars
            </span>
          </div>
        </div>
      </Card>
      
      {/* Checklist Hint */}
      <div className="bg-indigo-50/50 border border-indigo-50 rounded-xl p-4 flex gap-4 mt-4">
         <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
         <div className="text-xs text-indigo-800">
           <strong className="block mb-1">Make it stand out:</strong>
           Start with years of experience, highlight top technical skills, and conclude with a key achievement or goal.
         </div>
      </div>
    </div>
  );
});

export default React.memo(SummarySection);
