"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Sparkles } from "lucide-react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SkillStep = ({ next, previous, formData, updateForm }) => {
  const [skillList, setSkillList] = useState(formData.skills || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const schema = z.object({
    name: z.string().min(2, { message: "name is required" }),
    level: z.string({ message: "level is required" }),
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-gradient-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Skill" : "Add Skill"}
            </CardTitle>
            {isEditing && (
              <Button variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent>
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
                      <FormLabel>Skill Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., React.js, Node.js"
                          {...field}
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
                      <FormLabel>Proficiency Level</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Beginner, Intermediate, Expert"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 items-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-b from-indigo-600 to-purple-600"
                  >
                    <Plus className="h-4 mr-2" />
                    {isEditing ? "Update Skill" : "Add Skill"}
                  </Button>
                  <Button
                    className="bg-gradient-to-b from-indigo-600 to-purple-600"
                    onClick={next}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="">
            <div className="bg-blue-50 p-4 w-full">
              <h3 className="font-medium text-blue-900 mb-2">
                Tips for adding skills:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• List relevant technical or soft skills</li>
                <li>• Add your proficiency level if possible</li>
                <li>• Include both hard and soft skills</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-gradient-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Skills Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {skillList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No skills added yet.</p>
                <p className="text-sm">Add your first skill using the form.</p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {skill.name}
                        </h3>
                        {skill.level && (
                          <p className="text-sm text-blue-600">{skill.level}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(skill)}
                          size="icon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(skill.id)}
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillStep;
