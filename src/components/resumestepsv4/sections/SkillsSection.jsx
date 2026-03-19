"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Sparkles, Target } from "lucide-react";
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
import { toast } from "sonner";
import useResumeStore from "@/store/useResumeStore";

const SkillsSection = () => {
  const formData = useResumeStore((s) => s.formData);
  const updateForm = useResumeStore((s) => s.updateForm);

  const [skillList, setSkillList] = useState(
    Array.isArray(formData.skills) ? formData.skills : [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const suggestions = [
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Docker",
    "AWS",
    "Python",
  ];

  const schema = z.object({
    name: z.string().min(2, { message: "Skill required" }),
    level: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", level: "" },
  });

  useEffect(() => {
    updateForm({ skills: skillList });
  }, [skillList]);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-5">
          <Card className="border shadow-sm border-slate-100 bg-white rounded-2xl overflow-hidden">
            <div className="p-4">
              <div className="flex flex-wrap gap-4 mb-4">
                {suggestions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSuggestion(skill)}
                    className="text-[10px] font-bold px-2 py-2 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs">
                          Skill / Technology
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. TypeScript (comma separated)"
                            {...field}
                            className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs">
                          Level
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Expert"
                            {...field}
                            className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 rounded-xl mt-2 text-sm"
                  >
                    {isEditing ? "Update Skill" : "Add to Toolkit"}
                    <Plus className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </Card>
        </div>

        {/* Display Section */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4">
            {skillList.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
                <Target className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="text-slate-400 font-bold text-sm">
                  Skill Matrix Empty
                </h4>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {skillList.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="group flex items-center gap-2 bg-white pl-3 pr-1 py-1 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">
                          {skill.name}
                        </span>
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 border-l border-slate-100 pl-1 ml-1">
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
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillsSection);
