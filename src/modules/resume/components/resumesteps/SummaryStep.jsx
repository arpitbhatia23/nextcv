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
    <div className="py-4 md:py-8" style={{ backgroundColor: "#F7F7F5" }}>
      <FontImports />

      <div className="mb-2 pb-4 border-b-2" style={{ borderColor: "#1C2333" }}>
        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "#B3382C" }}>
          STEP 08 — PROFESSIONAL SUMMARY
        </div>
        <h2 className="font-display text-lg md:text-xl font-medium" style={{ color: "#1C2333" }}>
          Professional Summary
        </h2>
        <p className="text-[10px] md:text-xs mt-1" style={{ color: "#6B7280" }}>
          Generate or refine a short summary based on your full resume details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
        <Card
          className="rounded-none border shadow-none py-0 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
        >
          <CardHeader
            className="border-b p-3 gap-0 pb-0 flex flex-row justify-between items-center"
            style={{ borderColor: "#E4E2DC" }}
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              YOUR SUMMARY
            </CardTitle>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 rounded-none font-mono text-[10px] tracking-widest hover:bg-transparent"
              style={{ color: "#B3382C" }}
              disabled={isGenerating}
              onClick={handleAiGeneration}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isGenerating ? "WRITING..." : watchedSummary?.trim() ? "REFINE AI" : "GENERATE AI"}
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
                            className={`rounded-none border resize-none transition-all text-xs md:text-sm placeholder:text-[10px] md:placeholder:text-sm ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            style={{
                              backgroundColor: "#F7F7F5",
                              borderColor: "#E4E2DC",
                              color: "#1C2333",
                            }}
                            placeholder="Write your professional summary here or generate one with AI..."
                          />

                          {isGenerating && (
                            <div
                              className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
                              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                            >
                              <div
                                className="flex items-center gap-2 font-mono text-[10px] tracking-widest animate-pulse"
                                style={{ color: "#B3382C" }}
                              >
                                <Sparkles className="w-3 h-3" />
                                GENERATING...
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <p
                        className="font-mono text-[10px] md:text-xs text-right"
                        style={{ color: "#B7B5AC" }}
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
            <div className="p-3 md:p-4 w-full border-t" style={{ borderColor: "#E4E2DC" }}>
              <h3
                className="font-mono text-[10px] md:text-xs font-medium mb-2 flex items-center gap-2 uppercase tracking-widest"
                style={{ color: "#6B7280" }}
              >
                <AlignLeft className="w-3 md:w-4 h-3 md:h-4" style={{ color: "#B3382C" }} />
                Best Practices
              </h3>
              <ul
                className="text-[10px] md:text-sm space-y-1 pl-4 list-disc"
                style={{ color: "#6B7280" }}
              >
                <li>Keep it concise: 2-3 strong lines.</li>
                <li>Match your summary with the target job role.</li>
                <li>Use skills, experience, and projects from your resume.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        <Card
          className="rounded-none border shadow-none py-0 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
        >
          <CardHeader
            className="border-b p-3 gap-0 pb-0"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest flex items-center gap-2"
              style={{ color: "#6B7280" }}
            >
              <BrainCircuit className="w-4 h-4" style={{ color: "#B3382C" }} />
              LIVE PREVIEW
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 md:p-6 min-h-37.5" style={{ backgroundColor: "#F7F7F5" }}>
            {watchedSummary ? (
              <p
                className="font-display text-xs md:text-sm leading-relaxed italic border-l-2 pl-4"
                style={{ color: "#1C2333", borderColor: "#E4E2DC" }}
              >
                {watchedSummary}
              </p>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-10"
                style={{ color: "#B7B5AC" }}
              >
                <AlignLeft className="w-8 h-8 mb-2 opacity-40" />
                <p className="font-mono text-[10px] md:text-xs italic tracking-widest">
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
          className="rounded-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
          style={{ borderColor: "#E4E2DC", color: "#1C2333" }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          PREVIOUS
        </Button>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isGenerating}
          className="rounded-none text-white shadow-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
          style={{ backgroundColor: "#B3382C" }}
        >
          FINAL REVIEW
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SummaryStep);
