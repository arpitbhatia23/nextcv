"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BrainCircuit, Sparkles, ArrowRight, ArrowLeft, AlignLeft } from "lucide-react";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/shared/components/ui/form";
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
  const hasHydrated = useResumeStore(s => s._hasHydrated);

  const router = useRouter();

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

  // Zustand -> React Hook Form after hydration
  useEffect(() => {
    if (!hasHydrated) return;

    form.reset({
      summary: formData.summary || "",
    });
  }, [hasHydrated]);

  // React Hook Form -> Zustand
  useEffect(() => {
    if (!hasHydrated) return;
    if (watchedSummary === undefined) return;

    updateForm({
      summary: watchedSummary,
    });
  }, [hasHydrated, watchedSummary, updateForm]);

  const { handleAiGeneration, isGenerating } = useAiGeneration({
    type: "summary",
    jobDescription: formData.jobDescription,

    getPayload: () => ({
      jobRole: formData.jobRole,
      skills: formData.skills || [],
      education: formData.education || [],
      experience: formData.experience || [],
      projects: formData.projects || [],
      certificates: formData.certificates || [],
      currentSummary: watchedSummary || "",
      atsKeywords: formData.atsKeywords || "",
    }),

    onSuccess: result => {
      form.setValue("summary", result, {
        shouldDirty: true,
        shouldValidate: true,
      });

      updateForm({
        summary: result,
      });
    },
  });

  if (!hasHydrated) return null;

  const onSubmit = values => {
    updateForm({
      summary: values.summary,
    });

    router.push("/dashboard/builder/review");
  };

  return (
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Professional Summary</h2>
        <p className="text-[10px] md:text-sm text-slate-500">
          Generate or refine a short summary based on your full resume details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
        <Card className="bg-white rounded-lg md:rounded-xl py-0 shadow-sm border border-slate-200 overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50 p-3 gap-0 pb-0 rounded-t-xl flex flex-row justify-between items-center">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
              Your Summary
            </CardTitle>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 text-[10px] md:text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold"
              disabled={isGenerating}
              onClick={handleAiGeneration}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isGenerating ? "Writing..." : watchedSummary?.trim() ? "Refine AI" : "Generate AI"}
            </Button>
          </CardHeader>

          <CardContent className="p-3 md:p-4">
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
                            placeholder="Write your professional summary here or generate one with AI..."
                          />

                          {isGenerating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                Generating...
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
                <AlignLeft className="w-3 md:w-4 h-3 md:h-4 text-indigo-600" />
                Best Practices
              </h3>
              <ul className="text-[10px] md:text-sm text-indigo-800/80 space-y-1 pl-4 list-disc font-medium">
                <li>Keep it concise: 2-3 strong lines.</li>
                <li>Match your summary with the target job role.</li>
                <li>Use skills, experience, and projects from your resume.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-slate-50 rounded-lg md:rounded-xl py-0 border border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-white p-3 gap-0 pb-0">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              Live Preview
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 md:p-6 bg-white/50 min-h-37.5">
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

      <div className="flex justify-between items-center pt-6 md:pt-8">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/builder/certificate")}
          className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 px-4 text-xs md:text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isGenerating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 px-4 text-xs md:text-sm font-bold"
        >
          Final Review
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SummaryStep);
