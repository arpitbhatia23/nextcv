"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  FolderKanban,
  Sparkles,
  ArrowRight,
  ArrowLeft,
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
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Tips } from "../Tips";

const ProjectsStepV2 = ({ next, previous, formData, updateForm }) => {
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
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Innovation Portfolio
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg">
              Display your technical depth through real-world projects.
            </p>
          </div>

          <Card
            className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden"
            id="tour-projects-form-v2"
          >
            <div className="bg-indigo-600/5 px-3 md:px-6 py-2 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Rocket className="w-4 h-4" />{" "}
                {isEditing ? "Modify Project" : "Launch Project Entry"}
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
            <CardContent className="p-2 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold">Project Heading</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Decentralized Finance Dashboard"
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
                      name="roleOrType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold">Your Focus</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Lead Architect"
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
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold">Launch Date</FormLabel>
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
                    name="technologiesOrTopics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Tag className="w-4 h-4 text-indigo-500" /> Technology Stack
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Next.js, Web3.js, Tailwind"
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
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-indigo-500" /> External Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/..."
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold">
                            Impact & Implementation
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
                            placeholder="Detail the problem you solved and technical challenges..."
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
                    {isEditing ? "Solidify Project" : "Commit to Portfolio"}
                    <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Display Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.35em]">
              Showcase Index
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {projectList.length} Units
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6" id="tour-projects-list-v2">
            <AnimatePresence initial={false}>
              {projectList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-4xl p-16 text-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FolderKanban className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-black text-xl">Project Deck Empty</p>
                  <p className="text-slate-300 font-medium text-sm mt-1">
                    Add projects to demonstrate domain mastery.
                  </p>
                </motion.div>
              ) : (
                projectList.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  >
                    <Card className="group border-none bg-white hover:bg-slate-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl rounded-4xl transition-all overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-black text-slate-900 text-xl leading-tight">
                                {project.title}
                              </h4>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
                                >
                                  <LinkIcon className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.technologiesOrTopics?.split(",").map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-xs font-black text-slate-400">
                              <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md italic">
                                "{project.roleOrType}"
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-3 bg-white text-slate-400 hover:text-indigo-600 rounded-2xl shadow-sm border border-slate-50 transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-sm border border-slate-50 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
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
          <Tips section={"projects"} />
          <div className="pt-8 flex justify-between gap-2  md:gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h12 md:h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={next}
              className="h-12 md:h-14 px-6 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all"
            >
              Certifications <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectsStepV2);
