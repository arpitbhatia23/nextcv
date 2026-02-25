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
  CheckCircle2
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SummaryStepV2 = ({ next, previous, formData, updateForm }) => {
  const [isGenerating, setIsGenerating] = useState(false);

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
  }, [watchedSummary]);

  const onSubmit = () => {
    next();
  };

  const handleAiGeneration = async () => {
    try {
      setIsGenerating(true);
      const res = await axios.post("/api/gen/description", {
        type: "summary",
        data: formData,
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
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Editor Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Executive Pitch</h2>
            <p className="text-slate-500 mt-2 text-lg">In 2-3 sentences, capture the essence of your career.</p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
             <div className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-4">
                            <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                               <AlignLeft className="w-4 h-4 text-indigo-500" /> Editor
                            </FormLabel>
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all h-9 px-4 font-bold"
                              disabled={isGenerating}
                              onClick={handleAiGeneration}
                            >
                              <Sparkles className={`w-3.5 h-3.5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                              {isGenerating ? "Synthesizing..." : "Generate with AI"}
                            </Button>
                          </div>
                          
                          <div className="relative group">
                            <FormControl>
                              <Textarea
                                placeholder="Write your professional summary here..."
                                rows={10}
                                {...field}
                                className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-[2rem] transition-all resize-none p-8 text-lg leading-relaxed shadow-inner"
                              />
                            </FormControl>
                            
                            <AnimatePresence>
                               {isGenerating && (
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center gap-4 z-10"
                                  >
                                     <div className="relative">
                                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                                        <BrainCircuit className="absolute inset-0 m-auto w-6 h-6 text-indigo-600 animate-pulse" />
                                     </div>
                                     <p className="font-black text-indigo-600 uppercase tracking-widest text-sm">Processing Neural Content</p>
                                  </motion.div>
                               )}
                            </AnimatePresence>
                          </div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                
                <div className="mt-8 flex items-center justify-between text-slate-400">
                   <div className="flex gap-1.5 items-center">
                     <CheckCircle2 className={`w-4 h-4 transition-colors ${watchedSummary.length >= 50 ? 'text-emerald-500' : 'text-slate-200'}`} />
                     <span className="text-xs font-bold uppercase tracking-wider">Strength: {watchedSummary.length < 50 ? 'Needs more detail' : watchedSummary.length < 150 ? 'Good' : 'Impactful'}</span>
                   </div>
                   <span className="text-xs font-black">{watchedSummary.length} Characters</span>
                </div>
             </div>
          </Card>
        </div>

        {/* Preview & Tips Column */}
        <div className="lg:col-span-5 space-y-8">
           <div className="sticky top-32 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                 <Quote className="absolute -top-4 -left-4 w-32 h-32 text-white/5 rotate-12" />
                 
                 <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-300 mb-6 flex items-center gap-2">
                       <Zap className="w-4 h-4" /> Live Preview
                    </h3>
                    
                    <div className="min-h-[200px] flex items-center">
                       {watchedSummary ? (
                         <motion.p 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl leading-relaxed font-medium italic opacity-90"
                         >
                           "{watchedSummary}"
                         </motion.p>
                       ) : (
                         <div className="text-indigo-300/40 text-center w-full italic">
                            Enter your summary to see it come alive here...
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 space-y-6">
                 <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-amber-500" /> Success Checklist
                 </h4>
                 
                 <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-slate-600">
                       <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       </div>
                       Start with <strong>years of experience</strong>.
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600">
                       <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       </div>
                       Mention 2-3 <strong>top technical skills</strong>.
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600">
                       <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       </div>
                       Conclude with a <strong>key achievement</strong> or goal.
                    </li>
                 </ul>
              </div>

              <div className="pt-4 flex justify-between gap-4">
                <Button onClick={previous} variant="ghost" className="h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <ArrowLeft className="mr-2 w-5 h-5" /> Back
                </Button>
                <Button onClick={() => form.handleSubmit(onSubmit)()} className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all">
                   Final Review <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SummaryStepV2);
