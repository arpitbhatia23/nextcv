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
import { useRouter } from "next/navigation";

const ProjectsStepV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [projectList, setProjectList] = useState(formData.projects || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/certificates");
  }, [router]);

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
        toast.error("Project details required for AI");
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
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Form Column */}
        <div className="lg:col-span-6 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Innovation Portfolio
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Display your technical depth through your best work.
            </p>
          </div>

          <Card
            className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden"
            id="tour-projects-form-v2"
          >
            <div className="bg-indigo-600/5 px-4 md:px-6 py-3 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-[10px] md:text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Rocket className="w-3 md:w-4 h-3 md:h-4" />{" "}
                {isEditing ? "Modify Project" : "New Portfolio Unit"}
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
            <CardContent className="p-4 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">Project Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. AI Content Platform"
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
                      name="roleOrType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">Your Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Lead Dev"
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
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">Date</FormLabel>
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
                    name="technologiesOrTopics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Tag className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Stack used
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Next.js, Redux, Node"
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
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <LinkIcon className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Project Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                            Implementation
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
                            placeholder="Describe technical challenges and your solution..."
                            rows={3}
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
                    {isEditing ? "Update Project" : "Add to Portfolio"}
                    <Plus className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Display Column */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
              Live Preview
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {projectList.length} Units
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6" id="tour-projects-list-v2">
            <AnimatePresence initial={false}>
              {projectList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-4xl p-12 md:p-16 text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FolderKanban className="w-6 h-6 md:w-8 md:h-8 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-bold text-xs md:text-sm">No projects added yet.</p>
                </motion.div>
              ) : (
                projectList.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  >
                    <Card className="group border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-xl md:rounded-4xl transition-all overflow-hidden border border-slate-50">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-slate-900 text-xs md:text-lg leading-tight truncate">
                                {project.title}
                              </h4>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors border border-slate-50"
                                >
                                  <LinkIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                </a>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {project.technologiesOrTopics?.split(",").map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg border border-indigo-100/30"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-[9px] md:text-xs font-black text-slate-400">
                              <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md italic truncate">
                                "{project.roleOrType}"
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 md:gap-2 shrink-0">
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-1.5 md:p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-1.5 md:p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-lg shadow-sm transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>
                        {project.description && (
                          <div className="mt-3 text-[10px] md:text-sm text-slate-500 line-clamp-2 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
                            {project.description}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <Tips section={"projects"} />
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
              disabled={projectList.length === 0}
              className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all text-xs md:text-sm disabled:opacity-50"
              id="tour-next-button-v2"
            >
              Certifications <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectsStepV2);

