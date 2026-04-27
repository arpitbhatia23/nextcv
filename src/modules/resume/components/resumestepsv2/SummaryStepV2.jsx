"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlignLeft,
  Quote,
  Zap,
  CheckCircle2,
} from "lucide-react";
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
import { Card, CardContent } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const SummaryStepV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/final");
  }, [router]);

  const schema = z.object({
    summary: z.string().min(20, { message: "Summary should be at least 20 characters" }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: formData.summary || "",
    },
  });

  const watchedSummary = form.watch("summary");

  useEffect(() => {
    updateForm({ summary: watchedSummary });
  }, [watchedSummary, updateForm]);

  const onSubmit = () => {
    next();
  };

  useEffect(() => {
    if (!formData.summary) {
      handleAiGeneration();
    }
  }, [formData.summary]);

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
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Editor Column */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Executive Profile
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Capture your career essence in a powerful statement.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="p-4 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-3">
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <AlignLeft className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Professional Summary
                          </FormLabel>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all h-8 md:h-9 px-3 md:px-4 font-bold text-[10px] md:text-xs"
                            disabled={isGenerating}
                            onClick={handleAiGeneration}
                            id="tour-ai-button-v2"
                          >
                            <Sparkles
                              className={`w-3 md:w-3.5 h-3 md:h-3.5 mr-1.5 ${isGenerating ? "animate-spin" : ""}`}
                            />
                            {isGenerating ? "Syncing..." : "AI Enhance"}
                          </Button>
                        </div>

                        <div className="relative group min-h-[160px] md:min-h-[240px]">
                          <FormControl>
                            <Textarea
                              placeholder="Describe your career trajectory and value proposition..."
                              rows={8}
                              {...field}
                              className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-3xl transition-all resize-none p-4 md:p-8 text-xs md:text-lg leading-relaxed shadow-inner placeholder:text-[10px]"
                              id="tour-summary-form-v2"
                            />
                          </FormControl>

                          <AnimatePresence>
                            {isGenerating && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-3xl flex flex-col items-center justify-center gap-4 z-10"
                              >
                                <div className="relative">
                                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                                  <BrainCircuit className="absolute inset-0 m-auto w-5 h-5 md:w-6 md:h-6 text-indigo-600 animate-pulse" />
                                </div>
                                <p className="font-black text-indigo-600 uppercase tracking-widest text-[10px] md:text-sm">
                                  Synthesis in Progress
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

              <div className="mt-6 flex items-center justify-between text-slate-400">
                <div className="flex gap-2 items-center">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${watchedSummary.length >= 50 ? "text-emerald-500" : "text-slate-200"}`}
                  />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    Status:{" "}
                    <span className={watchedSummary.length >= 50 ? "text-emerald-600" : "text-amber-600"}>
                      {watchedSummary.length < 50 ? "Expanding..." : "Solid"}
                    </span>
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-black bg-slate-50 px-2 py-1 rounded-md">{watchedSummary.length} Chars</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview & Tips Column */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="sticky top-32 space-y-6 md:space-y-8">
            <div className="bg-slate-900 rounded-2xl md:rounded-4xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <Quote className="absolute -top-4 -left-4 w-24 md:w-32 h-24 md:h-32 text-white/5 rotate-12" />

              <div className="relative z-10">
                <h3 className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 md:mb-6 flex items-center gap-2">
                  <Zap className="w-3.5 md:w-4 h-3.5 md:h-4" /> Live Manifest
                </h3>

                <div className="min-h-[100px] md:min-h-[150px] flex items-center">
                  {watchedSummary ? (
                    <motion.p
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs md:text-xl leading-relaxed font-medium italic text-slate-200"
                    >
                      "{watchedSummary}"
                    </motion.p>
                  ) : (
                    <div className="text-slate-500 text-center w-full italic text-xs md:text-base">
                      Awaiting content for generation...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl md:rounded-4xl p-6 md:p-8 space-y-4 md:space-y-6 shadow-sm">
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] md:text-sm flex items-center gap-2">
                <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Pro Tips
              </h4>

              <ul className="space-y-3">
                {[
                  "Quantify your experience in years.",
                  "Integrate your top 3 tech stacks.",
                  "End with your current focus or goal."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-[10px] md:text-sm text-slate-600">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-indigo-500" />
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-between gap-4">
              <Button
                onClick={previous}
                variant="ghost"
                className="h-11 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs md:text-sm"
              >
                <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Previous
              </Button>
              <Button
                onClick={() => form.handleSubmit(onSubmit)()}
                className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all text-xs md:text-sm"
                id="tour-next-button-v2"
              >
                Assemble <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SummaryStepV2);

