"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Briefcase, Plus, Edit2, Trash2 } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import axios from "axios";

const ExperienceStep = ({ next, previous, formData, updateForm }) => {
  const [experienceList, setExperienceList] = useState(
    formData.experience || [],
  );
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

  const onSubmit = (values) => {
    if (isEditing) {
      setExperienceList((prev) =>
        prev.map((exp) =>
          exp.id === editingId ? { ...values, id: editingId } : exp,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setExperienceList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (experience) => {
    form.reset(experience);
    setIsEditing(true);
    setEditingId(experience.id);
  };

  const handleDelete = (id) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const handelAiGenration = async () => {
    try {
      const educationdetail = form.getValues();
      console.log(educationdetail);
      const isValid = Object.entries(educationdetail)
        .filter(([key]) => key !== "description")
        .some(([, val]) => val && val.trim() !== "");

      if (!isValid) {
        toast("Please fill in all education field before generating");
      } else {
        setIsGenerating(true);

        const res = await axios.post("/api/gen/description", {
          type: "experience",
          data: educationdetail,
        });

        if (res.data?.data) {
          form.setValue("description", String(res.data.data));
        }
      }
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-linear-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Experience" : "Add Experience"}
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Google, Amazon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Frontend Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="work"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Responsibilities</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., UI development, API integration"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value || ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? e.target.value.split(",").map((s) => s.trim())
                                : [],
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Separate multiple items with commas.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tools & Technologies Used</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., React, Tailwind CSS"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value || ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? e.target.value.split(",").map((s) => s.trim())
                                : [],
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Separate multiple items with commas.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief achievements or coursework"
                            rows={3}
                            {...field}
                            className={
                              isGenerating ? "text-gray-400 bg-gray-100" : ""
                            }
                            disabled={isGenerating}
                          />
                        </FormControl>

                        {/* Dream shimmer overlay */}
                        {isGenerating && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center text-indigo-700 font-semibold rounded-md z-10 animate-pulse">
                            ✨ Dreaming up your description...
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    className={`text-sm border-indigo-500 hover:bg-indigo-50 transition-all duration-300 ${
                      isGenerating
                        ? "text-gray-400 animate-pulse cursor-not-allowed"
                        : "text-indigo-600"
                    }`}
                    disabled={isGenerating}
                    onClick={handelAiGenration}
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </div>
                    ) : (
                      "Generate using AI"
                    )}
                  </Button>
                </div>

                <div className="flex justify-end gap-2 items-center">
                  <Button
                    type="submit"
                    className="bg-linear-to-b from-indigo-600 to-purple-600"
                  >
                    <Plus className="h-4 mr-2" />
                    {isEditing ? "Update Experience" : "Add Experience"}
                  </Button>
                  <Button
                    className="bg-linear-to-b from-indigo-600 to-purple-600"
                    onClick={next}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="p-0">
            <div className="bg-blue-50 p-4 w-full">
              <h3 className="font-medium text-blue-900 mb-2">
                Tips for adding work experience:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• List relevant work experiences</li>
                <li>• Focus on positions related to your goal role</li>
                <li>• Use the most recent job first</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-linear-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Experience Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {experienceList.length === 0 ||
            experienceList[0].position === "" ? (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No experience added yet.</p>
                <p className="text-sm">
                  Add your first work experience using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {experienceList.map((exp, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600">{exp.companyName}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(exp)}
                          size="icon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(exp.id)}
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span>{" "}
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>

                    <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
                      {exp?.description ??
                        exp?.description
                          ?.split("\n") // split by newlines
                          ?.map((line, idx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return null;

                            // If line starts with bullet symbol, just render as list item
                            if (trimmed.startsWith("•")) {
                              return (
                                <li key={idx} className="text-gray-700">
                                  {trimmed.replace(/^•\s*/, "")}
                                </li>
                              );
                            }

                            // If line contains heading (like "Key responsibilities include:")
                            const headingMatch =
                              trimmed.match(/^(.+?):\s*(.+)$/);
                            if (headingMatch) {
                              const [, heading, rest] = headingMatch;
                              // Split rest by semicolon for sub-bullets
                              const points = rest
                                .split(";")
                                .map((p) => p.trim())
                                .filter(Boolean);
                              return (
                                <li key={idx}>
                                  <span className="font-medium text-gray-800">
                                    {heading}:
                                  </span>
                                  <ul className="list-disc ml-5 mt-1 space-y-1">
                                    {points.map((point, i) => (
                                      <li key={i} className="text-gray-600">
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            }

                            // Otherwise, render normal sentence
                            return (
                              <li key={idx} className="text-gray-700">
                                {trimmed}
                              </li>
                            );
                          })}
                    </ul>
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

export default ExperienceStep;
