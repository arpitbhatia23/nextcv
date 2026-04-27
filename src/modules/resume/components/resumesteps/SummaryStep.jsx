"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrainCircuit, Sparkles, ArrowRight, ArrowLeft, AlignLeft } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAiGeneration } from "../../hooks/useAiGeneation";
import { useRouter } from "next/navigation";
import useResumeStore from "@/store/useResumeStore";

const schema = z.object({
  summary: z.string().min(20, {
    message: "Summary should be at least 20 characters",
  }),
});

const SummaryStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const hasHydrated = useResumeStore(s => s._hasHydrated); // ⚠️ required

  const router = useRouter();
  const [hasGenerated, setHasGenerated] = useState(false);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/review");
  }, [router]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: "",
    },
  });

  const watchedSummary = form.watch("summary");

  // ✅ Sync Zustand → Form AFTER hydration
  useEffect(() => {
    if (hasHydrated && formData.summary) {
      form.setValue("summary", formData.summary);
    }
  }, [hasHydrated, formData.summary]);

  // ✅ Save Form → Zustand (correct value)
  useEffect(() => {
    if (!hasHydrated) return;
    updateForm({ summary: watchedSummary });
  }, [watchedSummary]);

  // ✅ AI Generation Hook
  const { handleAiGeneration, isGenerating } = useAiGeneration({
    getPayload: () => ({
      ...formData,
      summary: watchedSummary,
    }),
    type: "summary",
    onSuccess: result => {
      form.setValue("summary", result);
      updateForm({ summary: result });
    },
  });

  // ✅ Safe AI auto-trigger (no overwrite)
  useEffect(() => {
    if (!hasHydrated) return;

    if (!formData.summary?.trim() && !hasGenerated) {
      handleAiGeneration();
      setHasGenerated(true);
    }
  }, [hasHydrated, formData.summary, hasGenerated]);

  // 🚫 Prevent render before hydration
  if (!hasHydrated) return null;

  const onSubmit = () => {
    router.push("/dashboard/builder/review");
  };

  return (
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Professional Summary</h2>
        <p className="text-[10px] md:text-sm text-slate-500">
          Write a short professional summary to introduce yourself
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form */}
        <Card className="bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50 p-3 md:p-4 rounded-t-xl flex flex-row justify-between items-center gap-2">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
              Your Summary
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 text-[10px] md:text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold"
                disabled={isGenerating}
                onClick={handleAiGeneration}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {isGenerating
                  ? "Writing..."
                  : watchedSummary?.trim()
                    ? "Refine AI"
                    : "Generate AI"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-3 md:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            rows={8}
                            {...field}
                            disabled={isGenerating}
                            className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all resize-none text-xs md:text-sm placeholder:text-[10px] ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            placeholder="Write your professional summary here..."
                          />
                          {isGenerating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold animate-pulse">
                                <Sparkles className="w-3 h-3" /> Generating...
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <p className="text-[10px] md:text-xs text-right text-slate-400 font-medium">
                        {watchedSummary?.length || 0} characters
                      </p>

                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="bg-indigo-50/50 p-3 md:p-4 w-full border-t border-indigo-100">
              <h3 className="text-[10px] md:text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2 uppercase tracking-tight">
                <AlignLeft className="w-3 md:w-4 h-3 md:h-4 text-indigo-600" /> Best Practices
              </h3>
              <ul className="text-[10px] md:text-sm text-indigo-800/80 space-y-1 pl-4 list-disc font-medium">
                <li>Keep it concise (3-5 sentences recommended).</li>
                <li>Focus on your biggest career achievements.</li>
                <li>Include industry keywords relevant to the role.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview */}
        <Card className="bg-slate-50 rounded-lg md:rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-white p-3 md:p-4">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-500" /> Live Preview
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 md:p-6 bg-white/50 min-h-[150px]">
            {watchedSummary ? (
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
                {watchedSummary}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <AlignLeft className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-[10px] md:text-xs font-medium italic">
                  Your summary will appear here...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 md:pt-8">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/builder/certificate")}
          className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
        >
          Final Review <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SummaryStep);

