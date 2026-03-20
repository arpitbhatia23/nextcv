"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  FolderKanban,
  Sparkles,
  Link as LinkIcon,
  Tag,
  Rocket,
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";

const ProjectsSection = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);

  const [projectList, setProjectList] = useState(formData.projects || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      roleOrType: "",
      organization: "",
      date: "",
      technologiesOrTopics: "",
      link: "",
      description: "",
      features: "",
    },
  });

  useEffect(() => {
    updateForm({ projects: projectList });
  }, [projectList]);

  const onSubmit = values => {
    if (isEditing) {
      setProjectList(prev =>
        prev.map(proj => (proj.id === editingId ? { ...values, id: editingId } : proj))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setProjectList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = project => {
    form.reset(project);
    setIsEditing(true);
    setEditingId(project.id);
  };

  const handleDelete = id => {
    setProjectList(prev => prev.filter(proj => proj.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAiGeneration = async () => {
    try {
      const detail = form.getValues();
      const isValid = detail.title && detail.roleOrType;

      if (!isValid) {
        toast.error("Project Meta required for AI Generation");
        return;
      }

      setIsGenerating(true);
      const res = await axios.post("/api/gen/description", {
        type: "project",
        data: detail,
      });

      if (res.data?.data) {
        form.setValue("description", String(res.data.data));
        toast.success("Project description generated!");
      }
    } catch (err) {
      toast.error("AI polish failed.");
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
                <Rocket className="w-3 h-3" /> {isEditing ? "Modify Project" : "Launch Project"}
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs">
                          Project Heading
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. DeFi Dashboard"
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="roleOrType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold text-xs">
                            Your Focus
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Lead Architect"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold text-xs">Date</FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="technologiesOrTopics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-1.5 text-xs">
                            <Tag className="w-3 h-3 text-indigo-500" /> Stack
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Next.js, Web3"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-1.5 text-xs">
                            <LinkIcon className="w-3 h-3 text-indigo-500" /> Link
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
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
                            Implementation
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
                            placeholder="Detail the problem you solved..."
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
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 rounded-xl mt-2 text-sm"
                  >
                    {isEditing ? "Compile Project" : "Add Project"}
                    <Plus className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Display Column */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence initial={false}>
              {projectList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center"
                >
                  <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">Project Deck Empty</p>
                </motion.div>
              ) : (
                projectList.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <Card className="group border bg-white shadow-xs rounded-xl transition-all overflow-hidden border-slate-100">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{project.title}</h4>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                  <LinkIcon className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {project.technologiesOrTopics?.split(",").map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>

                            <p className="text-[10px] font-bold text-slate-400 italic">
                              {project.roleOrType}
                            </p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-1.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded shadow-sm transition-all"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-1.5 bg-slate-50 text-slate-400 hover:text-red-500 rounded shadow-sm transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
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

export default React.memo(ProjectsSection);
