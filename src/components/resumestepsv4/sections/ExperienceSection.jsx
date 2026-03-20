"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";

const ExperienceSection = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);

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
      toast.error("AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-6">
          <Card className="border shadow-sm border-slate-100 bg-white rounded-2xl overflow-hidden">
            <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3 h-3" /> {isEditing ? "Refine Role" : "New Experience"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-6 text-[10px] font-bold text-slate-400"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                          <Building2 className="w-3 h-3 text-indigo-500" /> Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Google, TechStart"
                            {...field}
                            className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                          <Layers className="w-3 h-3 text-indigo-500" /> Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Frontend Engineer"
                            {...field}
                            className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-indigo-500" /> From
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-indigo-500" /> To
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
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
                          <FormLabel className="text-slate-900 font-bold text-xs">
                            Achivements
                          </FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-[10px] font-black text-indigo-600 flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                            {isGenerating ? "Synthesizing..." : "Generate AI"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your impact..."
                            rows={3}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all resize-none p-3 text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 rounded-xl text-sm"
                  >
                    {isEditing ? "Save Role" : "Add Experience"}
                    <Plus className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* List Column */}
        <div className="lg:col-span-6">
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />
            <AnimatePresence initial={false}>
              {experienceList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center"
                >
                  <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">No history added</p>
                </motion.div>
              ) : (
                experienceList.map(exp => (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative"
                  >
                    <div className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2 border-white bg-indigo-500 z-10" />
                    <Card className="group border shadow-xs bg-white rounded-xl transition-all overflow-hidden border-slate-100">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-block bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1">
                              {exp.companyName}
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">{exp.position}</h4>
                            <p className="text-xs text-slate-500 mt-1">
                              {exp.startDate} - {exp.endDate || "Present"}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleEdit(exp)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        {exp.description && (
                          <div className="mt-3 pt-3 border-t border-slate-50">
                            <p className="text-xs text-slate-500 line-clamp-2">{exp.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExperienceSection);
