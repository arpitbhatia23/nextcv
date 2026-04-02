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
import { Tips } from "../../../../components/Tips";

const ExpricenceStepV2 = ({ next, previous, formData, updateForm }) => {
  const [experienceList, setExperienceList] = useState(formData.experience || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Input Form Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Professional History
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg">
              Highlight your career progression and impact.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounde-2xl  md:rounded-3xl overflow-hidden">
            <div className="bg-indigo-600/5 px-6 py-2 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-sm font-semibold md:font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> {isEditing ? "Refine Role" : "New Career Chapter"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-8 text-xs font-bold text-slate-400"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-2 md:p-8" id="tour-experience-form-v2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-indigo-500" /> Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Google, TechStart"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-500" /> Position / Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Frontend Engineer"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" /> From
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" /> To
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
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
                          <FormLabel className="text-slate-900 font-bold">
                            What did you achieve?
                          </FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-xs font-black text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                            id="tour-ai-button-v2"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                            {isGenerating
                              ? "Synthesizing..."
                              : form.watch("description")?.trim()
                                ? "Enhance with AI"
                                : "Generate with AI"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your impact, tools used, and results..."
                            rows={5}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all resize-none p-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-12 md:h-14 rounded-xl md:rounded-2xl transition-all group"
                  >
                    {isEditing ? "Save Role Changes" : "Log Experience Entry"}
                    <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Career Timeline Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.35em]">
              Career Path
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {experienceList.length} Experiences
            </span>
          </div>

          <div className="relative pl-8 space-y-8" id="tour-experience-list-v2">
            <div className="absolute left-2.75 top-4 bottom-4 w-0.5 bg-slate-100" />

            <AnimatePresence initial={false}>
              {experienceList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-4xl p-16 text-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-black text-xl leading-snug">
                    No history logged yet.
                    <br />
                    <span className="text-xs font-medium text-slate-300">
                      Your professional growth will appear here.
                    </span>
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
                    <div className="absolute -left-6.75 top-8 w-4 h-4 rounded-full border-4 border-white shadow-lg bg-indigo-600 z-10" />

                    <Card className="group border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-4xl transition-all overflow-hidden">
                      <CardContent className="p-2 md:p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              <Building2 className="w-3 h-3" /> {exp.companyName}
                            </div>
                            <h4 className="font-black text-slate-900 text-md md:text-xl leading-tight">
                              {exp.position}
                            </h4>
                            <div className="flex items-center gap-3 text-xs font-black text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> {exp.startDate} -{" "}
                                {exp.endDate || "Present"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(exp)}
                              className="p-3 bg-white text-slate-400 hover:text-indigo-600 rounded-lg md:rounded-2xl shadow-sm transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-lg md:rounded-2xl shadow-sm transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {exp.description && (
                          <div className="mt-6 pt-6 border-t border-slate-50">
                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
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

          <div className="pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-12 md:h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={next}
              className="h-12 md:h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all"
              id="tour-next-button-v2"
            >
              Project Showcase <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExpricenceStepV2);
