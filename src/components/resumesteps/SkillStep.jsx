"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Sparkles, ArrowRight, ArrowLeft, Wrench } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SkillStep = ({ next, previous, formData, updateForm }) => {
  const [skillList, setSkillList] = useState(formData.skills || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string({ message: "Level is required" }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      level: "",
    },
  });

  useEffect(() => {
    console.log(skillList);
    updateForm({ skills: skillList });
  }, [skillList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setSkillList((prev) =>
        prev.map((skill) =>
          skill.id === editingId ? { ...values, id: editingId } : skill
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setSkillList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (skill) => {
    form.reset(skill);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleDelete = (id) => {
    setSkillList((prev) => prev.filter((skill) => skill.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="py-8">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
          <p className="text-slate-500">Showcase your technical proficiency</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200" id="tour-skills-form">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  {isEditing ? "Edit Skill" : "Add Skill"}
                </CardTitle>
             </div>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500 hover:text-slate-700">
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Skill Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. React.js, Python"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
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
                          <FormLabel className="text-slate-700 font-semibold">Proficiency</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Expert, Intermediate"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-11 rounded-lg"
                  >
                     {isEditing ? "Update Skill" : "Add Skill"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="p-0">
            <div className="bg-blue-50 p-4 w-full rounded-b-xl">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-1 pl-6 list-disc">
                <li>Include both hard skills (technical) and soft skills.</li>
                <li>Rate your proficiency honestly to build trust.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
           <div className="bg-slate-50 rounded-xl border border-slate-200 p-5" id="tour-skills-list">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                 <Wrench className="w-5 h-5 text-indigo-500" /> Added Skills
              </h3>

            {skillList.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                   <p className="text-slate-400 text-sm">No skills added yet.</p>
                </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white pl-4 pr-2 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-3 group hover:border-indigo-300 transition-all"
                  >
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm">{skill.name}</span>
                        {skill.level && <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{skill.level}</span>}
                      </div>

                      <div className="flex items-center border-l border-slate-100 pl-2 ml-1">
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(skill)}
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-indigo-600 rounded-full"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-red-500 rounded-full"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                  </div>
                ))}
              </div>
            )}
           </div>

           <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={previous} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8" id="tour-next-button">
                 Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SkillStep;
