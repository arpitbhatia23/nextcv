"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, FolderKanban } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const ProjectsStep = ({ next, previous, formData, updateForm }) => {
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

  const onSubmit = (values) => {
    if (isEditing) {
      setProjectList((prev) =>
        prev.map((proj) =>
          proj.id === editingId ? { ...values, id: editingId } : proj
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setProjectList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (project) => {
    form.reset(project);
    setIsEditing(true);
    setEditingId(project.id);
  };

  const handleDelete = (id) => {
    setProjectList((prev) => prev.filter((proj) => proj.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };
  const handelAiGenration = async () => {
    try {
      const detail = form.getValues();
      console.log(detail);
      const isValid = Object.entries(detail)
        .filter(([key]) => key !== "description")
        .some(([, val]) => val && val.trim() !== "");

      if (!isValid) {
        toast("Please fill in all project field before generating");
      } else {
        setIsGenerating(true);

        const res = await axios.post("/api/gen/description", {
          type: "project",
          data: detail,
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
            <CardTitle className="text-2xl font-bold text-white">
              {isEditing ? "Edit Project" : "Add Project"}
            </CardTitle>
            {isEditing && (
              <Button variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className={"p-4"}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Title of project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roleOrType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your role in project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your organization or institution"
                          {...field}
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
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YYYY or YYYY"
                          type={"month"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="technologiesOrTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies or Topics</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., React, AI in Healthcare"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input placeholder="Features of project" {...field} />
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
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project or publication link"
                          {...field}
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
                    className="bg-linear-to-b from-indigo-600 to-purple-600 text-white"
                  >
                    <Plus className="h-4 mr-2" />
                    {isEditing ? "Update Project" : "Add Project"}
                  </Button>
                  <Button
                    type="button"
                    className="bg-linear-to-b from-indigo-600 to-purple-600 text-white"
                    onClick={next}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-linear-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <FolderKanban className="w-6 h-6 text-white mr-2" />
            <CardTitle className="text-2xl font-bold text-white">
              Project Review
            </CardTitle>
          </CardHeader>

          <CardContent>
            {projectList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No projects added yet.</p>
                <p className="text-sm">
                  Start by adding a project using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {projectList.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow px-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {project.title}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">
                            {project.roleOrType}
                          </span>{" "}
                          at {project.organization} ({project.date})
                        </p>
                        <p className="text-sm text-blue-600">
                          {project.technologiesOrTopics}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-sm text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Project
                          </a>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(project)}
                          size="icon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {project.description
                      .split("\n") // split by newlines
                      .map((line, idx) => {
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
                        const headingMatch = trimmed.match(/^(.+?):\s*(.+)$/);
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
                              <ul className="list-disc ml-5 mt-1 space-y-2">
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

export default ProjectsStep;
