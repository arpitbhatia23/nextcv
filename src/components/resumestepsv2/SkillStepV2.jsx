"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wrench,
  Zap,
  Target,
  Brain,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const SkillStepV2 = ({ next, previous, formData, updateForm }) => {
  const [skillList, setSkillList] = useState(
    Array.isArray(formData.skills) ? formData.skills : [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string().min(1, { message: "Proficiency is required" }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      level: "",
    },
  });

  useEffect(() => {
    updateForm({ skills: skillList });
  }, [skillList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setSkillList((prev) =>
        prev.map((skill) =>
          skill.id === editingId ? { ...values, id: editingId } : skill,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setSkillList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset({ name: "", level: "" });
  };

  const handleEdit = (skill) => {
    form.reset(skill);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleDelete = (id) => {
    setSkillList((prev) => prev.filter((skill) => skill.id !== id));
  };

  return (
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Core Expertise
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Define your professional toolkit and strengths.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden" id="tour-skills-form-v2">
            <div className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold">
                          Skill / Technology
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. TypeScript, UI Design"
                            {...field}
                            className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold">
                            Proficiency Level
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Expert, Advanced"
                              {...field}
                              className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-14 rounded-2xl transition-all group"
                  >
                    {isEditing ? "Update Skill" : "Add to Toolkit"}
                    <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-amber-50 p-6 border-t border-amber-100 italic">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  <span className="font-black text-amber-900 uppercase tracking-tighter mr-1">
                    Pro Tip:
                  </span>
                  Focus on high-demand technical skills first. ATS algorithms
                  prioritize skills mentioned in job descriptions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.35em]">
              Skill Map
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {skillList.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6" id="tour-skills-list-v2">
            {skillList.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-4xl p-16 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="text-slate-400 font-black text-xl">
                  Skill Matrix Empty
                </h4>
                <p className="text-slate-300 font-medium text-sm mt-1">
                  Start adding your technical and soft skills.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {skillList.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="group flex items-center gap-3 bg-white pl-5 pr-2 py-2.5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                          {skill.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 border-l border-slate-100 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={next}
              disabled={skillList.length === 0}
              className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all disabled:opacity-50"
              id="tour-next-button-v2"
            >
              Experience Strategy <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillStepV2);
