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
import posthog from "@/shared/utils/posthog";

/* Fonts: Fraunces for the section title, IBM Plex Mono for eyebrows,
   labels, and helper text — matches BasicInfoStep / EducationStep / SkillStep / ExperienceStep / ProjectsStep / CertificateStep. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

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
    posthog.capture("builder_step_viewed", {
      step: "summary",
      step_number: 8,
    });
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
    posthog.capture("builder_step_complete", {
      step: "summary",
      step_number: 8,
    });
    router.push("/dashboard/builder/review");
  };

  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />

      <div className="mb-2 pb-4 border-b border-[#E3E2DC]">
        <div className="font-mono text-[10px] tracking-widest mb-1 text-[#465B9E]">
          STEP 08 — PROFESSIONAL SUMMARY
        </div>
        <h2 className="font-display text-xl md:text-2xl font-medium text-[#17201C]">
          Professional Summary
        </h2>
        <p className="text-xs md:text-sm mt-1 text-[#5B625C]">
          Generate or refine a short summary highlighting your career value proposition
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
        <Card
          className="rounded-2xl border border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white"
        >
          <CardHeader
            className="border-b border-[#E3E2DC] p-4 flex flex-row justify-between items-center"
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-wider text-[#5B625C]"
            >
              YOUR SUMMARY
            </CardTitle>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 rounded-lg font-sans text-xs text-[#465B9E] bg-[#EEF0F7] hover:bg-[#C8CDD9]/40 border border-[#C8CDD9] font-medium"
              disabled={isGenerating}
              onClick={handleAiGeneration}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {isGenerating ? "Writing..." : watchedSummary?.trim() ? "Refine with AI" : "Generate with AI"}
            </Button>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
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
                            className={`rounded-xl border border-[#E3E2DC] bg-[#F8F7F3] text-[#17201C] resize-none transition-all text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 focus-visible:ring-[#465B9E] ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            placeholder="Write your professional summary here or generate one with AI..."
                          />

                          {isGenerating && (
                            <div
                              className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] rounded-xl bg-white/60"
                            >
                              <div
                                className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#465B9E] animate-pulse"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                GENERATING...
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <p
                        className="font-mono text-[10px] md:text-xs text-right text-[#8A908B]"
                      >
                        {watchedSummary?.length || 0} CHARACTERS
                      </p>

                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="p-4 w-full border-t border-[#E3E2DC] bg-[#F8F7F3]/40">
              <h3
                className="font-mono text-[10px] md:text-xs font-medium mb-2 flex items-center gap-2 uppercase tracking-widest text-[#5B625C]"
              >
                <AlignLeft className="w-3.5 h-3.5 text-[#465B9E]" />
                Best Practices
              </h3>
              <ul
                className="text-xs text-[#5B625C] space-y-1 pl-4 list-disc leading-relaxed"
              >
                <li>Keep it concise: 2-3 impact-driven lines.</li>
                <li>Align your summary with the target job role.</li>
                <li>Highlight top skills, achievements, and unique qualifications.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        <Card
          className="rounded-2xl border border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white"
        >
          <CardHeader
            className="border-b border-[#E3E2DC] p-4"
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-wider flex items-center gap-2 text-[#5B625C]"
            >
              <BrainCircuit className="w-4 h-4 text-[#465B9E]" />
              LIVE PREVIEW
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 md:p-6 min-h-37.5 bg-[#F8F7F3]/50">
            {watchedSummary ? (
              <p
                className="font-display text-xs md:text-sm leading-relaxed italic border-l-2 border-[#465B9E] pl-4 text-[#17201C]"
              >
                {watchedSummary}
              </p>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-12 text-[#8A908B]"
              >
                <AlignLeft className="w-8 h-8 mb-2 opacity-40 text-[#465B9E]" />
                <p className="font-mono text-[10px] md:text-xs tracking-wider">
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
          className="rounded-xl h-10 px-4 md:px-5 font-sans text-xs md:text-sm font-medium border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isGenerating}
          className="rounded-xl text-white shadow-xs h-10 px-5 md:px-6 font-sans text-xs md:text-sm font-medium bg-[#465B9E] hover:bg-[#344B93] transition-colors"
        >
          Final Review
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SummaryStep);
