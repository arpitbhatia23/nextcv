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
  Target,
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
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const SkillStepV2 = ({ next, previous, formData, updateForm }) => {
  const [skillList, setSkillList] = useState(
    Array.isArray(formData.skills) ? formData.skills : [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ Smart Suggestions
  const suggestions = [
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Docker",
    "AWS",
    "Python",
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem Solving",
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
  const onSubmit = (values) => {
    const names = values.name
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (isEditing) {
      setSkillList((prev) =>
        prev.map((skill) =>
          skill.id === editingId
            ? {
                ...skill,
                name: names[0],
                level: values.level || "Intermediate",
              }
            : skill,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newSkills = names
        .filter(
          (name) =>
            !skillList.some(
              (skill) => skill.name.toLowerCase() === name.toLowerCase(),
            ),
        )
        .map((name) => ({
          id: crypto.randomUUID(),
          name,
          level: values.level || "Intermediate",
        }));

      setSkillList((prev) => [...prev, ...newSkills]);
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

  const addSuggestion = (skillName) => {
    if (
      !skillList.some(
        (skill) => skill.name.toLowerCase() === skillName.toLowerCase(),
      )
    ) {
      setSkillList((prev) => [
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
    if (skillList.length < 2) {
      alert("Add at least 2 skills to continue.");
      return;
    }
    next();
  };

  return (
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Core Expertise
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg">
              Define your professional toolkit and strengths.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-2 md:p-8">
              {/* ✅ Suggestions (UI preserved style) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSuggestion(skill)}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                  >
                    {skill}
                  </button>
                ))}
              </div>

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
                            placeholder="e.g. TypeScript, UI Design (comma separated supported)"
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
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-10 md:h-14 rounded-xl md:rounded-2xl transition-all group"
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
                  Add at least 2–3 strong skills for better AI resume output.
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
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md md:rounded-full">
              {skillList.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {skillList.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-4xl p-16 text-center">
                <Target className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                <h4 className="text-slate-400 font-black text-xl">
                  Skill Matrix Empty
                </h4>
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
                      className="group flex items-center gap-3 bg-white pl-5 pr-2 py-2 rounded-lg md:rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                          {skill.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 border-l border-slate-100 pl-2">
                        <button onClick={() => handleEdit(skill)}>
                          <Edit2 className="w-3 h-3 text-slate-400 hover:text-indigo-600" />
                        </button>
                        <button onClick={() => handleDelete(skill.id)}>
                          <Trash2 className="w-3 h-3 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="pt-8 flex justify-between gap-2 md:gap-4">
            <Button onClick={previous} variant="ghost">
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={skillList.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
