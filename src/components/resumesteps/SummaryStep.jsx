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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const SummaryStep = ({ next, previous, formData, updateForm }) => {
  const [summary, setSummary] = useState(formData.summary || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const schema = z.object({
    summary: z.string().min(20, { message: "Summary should be at least 20 characters" }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: summary,
    },
  });

  // Watch for changes to update local state for preview
  const watchedSummary = form.watch("summary");

  useEffect(() => {
    updateForm({ summary: watchedSummary });
  }, [watchedSummary]);

  const onSubmit = (values) => {
    console.log(values);
    next();
  };

  const handelAiGenration = async () => {
    try {
      setIsGenerating(true);

      const res = await axios.post("/api/gen/description", {
        type: "summary",
        data: formData,
      });

      if (res.data?.data) {
        form.setValue("summary", String(res.data.data));
        toast.success("AI Summary generated!");
      }
    } catch (err) {
      console.error("AI generation failed:", err);
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="py-8">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Professional Summary</h2>
          <p className="text-slate-500">Write a short professional summary to introduce yourself</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl">
            <CardTitle className="text-lg font-bold text-slate-800">
               Your Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center text-slate-700 font-semibold">
                         Summary
                         <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            disabled={isGenerating}
                            onClick={handelAiGenration}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            {isGenerating ? "Magic..." : "Generate with AI"}
                          </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Experienced software engineer with a focus on..."
                            rows={8}
                            {...field}
                            className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all resize-none text-base leading-relaxed ${
                                isGenerating ? "opacity-50" : ""
                            }`}
                            disabled={isGenerating}
                          />
                        </FormControl>

                        {isGenerating && (
                           <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                             <div className="flex items-center gap-2 text-indigo-600 font-semibold animate-pulse">
                                <Sparkles className="w-4 h-4" /> Writing...
                             </div>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                   {/* We handle next in the outer button row, but form submit is useful for validation */}
                </div>
              </form>
            </Form>
          </CardContent>
           <CardFooter className="p-0">
            <div className="bg-blue-50 p-4 w-full rounded-b-xl">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                 <AlignLeft className="w-4 h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-1 pl-6 list-disc">
                 <li>Keep it concise (2-4 sentences).</li>
                 <li>Highlight your years of experience and key achievements.</li>
                 <li>Use keywords relevant to the job you are applying for.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <div className="space-y-6">
            <Card className="bg-white rounded-xl shadow-sm border border-slate-200 h-full">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl">
                 <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-indigo-600" />
                    <CardTitle className="text-lg font-bold text-slate-800">
                      Preview
                    </CardTitle>
                 </div>
              </CardHeader>

              <CardContent className="p-6">
                {watchedSummary ? (
                  <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm">
                    {watchedSummary}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <AlignLeft className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                    <p>Start writing to see the preview here.</p>
                  </div>
                )}
              </CardContent>
            </Card>

           <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={previous} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => form.handleSubmit(onSubmit)()} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8">
                 Save & Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
