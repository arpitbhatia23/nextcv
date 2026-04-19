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
    router.push("/dashboard/resumeform/review");
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Professional Summary</h2>
        <p className="text-slate-500">Write a short professional summary to introduce yourself</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <Card className="bg-white rounded-xl shadow-sm border">
          <CardHeader className="border-b p-4">
            <CardTitle>Your Summary</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        Summary
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          disabled={isGenerating}
                          onClick={handleAiGeneration}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {isGenerating
                            ? "Writing..."
                            : watchedSummary?.trim()
                              ? "Enhance"
                              : "Generate"}
                        </Button>
                      </FormLabel>

                      <FormControl>
                        <Textarea rows={8} {...field} disabled={isGenerating} />
                      </FormControl>

                      <p className="text-xs text-right text-slate-400">
                        {watchedSummary?.length || 0} chars
                      </p>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <ul className="text-sm text-blue-800 list-disc pl-4">
              <li>Keep it concise</li>
              <li>Highlight achievements</li>
              <li>Use job keywords</li>
            </ul>
          </CardFooter>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <BrainCircuit className="w-5 h-5" /> Preview
            </CardTitle>
          </CardHeader>

          <CardContent>
            {watchedSummary ? (
              <p>{watchedSummary}</p>
            ) : (
              <p className="text-slate-400">Start writing...</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/dashboard/resumeform/certificate")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Button onClick={form.handleSubmit(onSubmit)}>
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
