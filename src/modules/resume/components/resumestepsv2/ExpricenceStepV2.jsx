"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  Layers,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Textarea } from "../../../../shared/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Tips } from "../Tips";
import { useRouter } from "next/navigation";

const ExpricenceStepV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [experienceList, setExperienceList] = useState(formData.experience || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/projects");
  }, [router]);

  const form = useForm({
    defaultValues: {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      work: [],
      tools: [],
      description: "",
    },
  });

  useEffect(() => {
    updateForm({ experience: experienceList });
  }, [experienceList]);

  const onSubmit = values => {
    if (isEditing) {
      setExperienceList(prev =>
        prev.map(exp => (exp.id === editingId ? { ...values, id: editingId } : exp))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setExperienceList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = experience => {
    form.reset(experience);
    setIsEditing(true);
    setEditingId(experience.id);
  };

  const handleDelete = id => {
    setExperienceList(prev => prev.filter(exp => exp.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAiGeneration = async () => {
    try {
      const expDetail = form.getValues();
      const isValid = expDetail.companyName && expDetail.position;

      if (!isValid) {
        toast.error("Enter Company and Position first!");
        return;
      }

      setIsGenerating(true);
      const res = await axios.post("/api/gen/description", {
        type: "experience",
        data: expDetail,
      });

      if (res.data?.data) {
        form.setValue("description", String(res.data.data));
        toast.success("Experience content polished!");
      }
    } catch (err) {
      toast.error(err.message || "AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Input Form Column */}
        <div className="lg:col-span-6 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Work History
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Highlight your career progression and impact.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-indigo-600/5 px-4 md:px-6 py-3 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-[10px] md:text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3 md:w-4 h-3 md:h-4" /> {isEditing ? "Refine Role" : "New Career Chapter"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-7 md:h-8 text-[10px] md:text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4 md:p-8" id="tour-experience-form-v2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Building2 className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Acme Corp"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Layers className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Position / Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Developer"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Calendar className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> From
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Calendar className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> To
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                            Achievements
                          </FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-[9px] md:text-xs font-black text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                            id="tour-ai-button-v2"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                            {isGenerating ? "Working..." : "AI Content"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your impact and results..."
                            rows={4}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all resize-none p-4 text-xs md:text-sm placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-11 md:h-14 rounded-xl md:rounded-2xl transition-all group text-xs md:text-sm"
                  >
                    {isEditing ? "Update Entry" : "Add Experience"}
                    <Plus className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Career Timeline Column */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
              Live Preview
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {experienceList.length} Entries
            </span>
          </div>

          <div className="relative pl-6 md:pl-8 space-y-6 md:space-y-8" id="tour-experience-list-v2">
            <div className="absolute left-2 md:left-2.75 top-4 bottom-4 w-0.5 bg-slate-100" />

            <AnimatePresence initial={false}>
              {experienceList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-4xl p-12 md:p-16 text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-bold text-xs md:text-sm">
                    No work history logged.
                  </p>
                </motion.div>
              ) : (
                experienceList.map(exp => (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.9, opacity: 0, x: -20 }}
                    className="relative"
                  >
                    <div className="absolute -left-5 md:-left-6.75 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 border-white shadow-lg bg-indigo-600 z-10" />

                    <Card className="group border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-xl md:rounded-4xl transition-all overflow-hidden border border-slate-50">
                      <CardContent className="p-4 md:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 min-w-0 flex-1">
                            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate max-w-full">
                              <Building2 className="w-3 h-3" /> {exp.companyName}
                            </div>
                            <h4 className="font-black text-slate-900 text-xs md:text-xl leading-tight truncate">
                              {exp.position}
                            </h4>
                            <div className="flex items-center gap-3 text-[10px] md:text-xs font-black text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" /> {exp.startDate} -{" "}
                                {exp.endDate || "Present"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 md:gap-2 shrink-0">
                            <button
                              onClick={() => handleEdit(exp)}
                              className="p-1.5 md:p-3 bg-white text-slate-400 hover:text-indigo-600 rounded-lg md:rounded-2xl shadow-sm transition-all border border-slate-50"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="p-1.5 md:p-3 bg-white text-slate-400 hover:text-red-500 rounded-lg md:rounded-2xl shadow-sm transition-all border border-slate-50"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>

                        {exp.description && (
                          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-50">
                            <p className="text-[10px] md:text-sm text-slate-500 leading-relaxed line-clamp-3 italic">
                              {exp.description}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <Tips section={"experience"} />

          <div className="pt-6 md:pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-11 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs md:text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Previous
            </Button>
            <Button
              onClick={next}
              disabled={experienceList.length === 0}
              className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all text-xs md:text-sm disabled:opacity-50"
              id="tour-next-button-v2"
            >
              Projects <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExpricenceStepV2);

