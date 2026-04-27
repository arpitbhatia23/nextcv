"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Sparkles, ArrowRight, ArrowLeft, Target } from "lucide-react";
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
import { Card } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tips } from "../Tips";
import { useRouter } from "next/navigation";

const SkillStepV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [skillList, setSkillList] = useState(Array.isArray(formData.skills) ? formData.skills : []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/experience");
  }, [router]);

  // ✅ Smart Suggestions
  const suggestions = [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Docker",
    "AWS",
    "Python",
    "Teamwork",
  ];

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", level: "" },
  });

  useEffect(() => {
    updateForm({ skills: skillList });
  }, [skillList]);

  // ✅ Add / Edit Skill (multi support + duplicate prevention)
  const onSubmit = values => {
    const names = values.name
      .split(",")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (isEditing) {
      setSkillList(prev =>
        prev.map(skill =>
          skill.id === editingId
            ? {
                ...skill,
                name: names[0],
                level: values.level || "Intermediate",
              }
            : skill
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newSkills = names
        .filter(name => !skillList.some(skill => skill.name.toLowerCase() === name.toLowerCase()))
        .map(name => ({
          id: crypto.randomUUID(),
          name,
          level: values.level || "Intermediate",
        }));

      setSkillList(prev => [...prev, ...newSkills]);
    }

    form.reset({ name: "", level: "" });
  };

  const handleEdit = skill => {
    form.reset(skill);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleDelete = id => {
    setSkillList(prev => prev.filter(skill => skill.id !== id));
  };

  const addSuggestion = skillName => {
    if (!skillList.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      setSkillList(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: skillName,
          level: "Intermediate",
        },
      ]);
    }
  };

  const handleNext = () => {
    if (skillList.length < 3) {
      toast("Add at least 3 skills to continue.");
      return;
    }
    next();
  };

  return (
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Skill Architecture
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Define your professional toolkit and strengths.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="p-4 md:p-8">
              {/* ✅ Suggestions */}
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSuggestion(skill)}
                    className="text-[9px] md:text-xs font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all border border-slate-100"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                          Skill / Technology
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. React, Python"
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
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                          Proficiency Level
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Expert, Advanced"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-11 md:h-14 rounded-xl md:rounded-2xl transition-all group text-xs md:text-sm"
                  >
                    {isEditing ? "Update Skill" : "Add to Toolkit"}
                    <Plus className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-indigo-50/50 p-4 md:p-6 border-t border-indigo-100/50 italic">
              <div className="flex gap-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 shrink-0" />
                <p className="text-[10px] md:text-xs text-indigo-700 leading-relaxed font-bold">
                  Add at least 5 key skills to showcase your breadth of expertise.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
              Skill Inventory
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {skillList.length} Total
            </span>
          </div>

          <div className="min-h-[200px]">
            {skillList.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-4xl p-12 md:p-16 text-center">
                <Target className="w-8 h-8 md:w-10 md:h-10 text-slate-200 mx-auto mb-4" />
                <h4 className="text-slate-400 font-bold text-sm md:text-xl">Skill Matrix Empty</h4>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 md:gap-3">
                <AnimatePresence>
                  {skillList.map(skill => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="group flex items-center gap-3 bg-white pl-4 md:pl-5 pr-2 md:pr-2 py-1.5 md:py-2.5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 text-xs md:text-sm truncate max-w-[120px] md:max-w-none">{skill.name}</span>
                        <span className="text-[8px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                          {skill.level || "Skill"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 border-l border-slate-100 pl-2">
                        <button 
                          onClick={() => handleEdit(skill)}
                          className="p-1 hover:bg-slate-50 rounded"
                        >
                          <Edit2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(skill.id)}
                          className="p-1 hover:bg-slate-50 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <Tips section={"skills"} />

          <div className="pt-6 md:pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-11 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs md:text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={skillList.length === 0}
              className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 text-xs md:text-sm"
              id="tour-next-button-v2"
            >
               Experience <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillStepV2);

