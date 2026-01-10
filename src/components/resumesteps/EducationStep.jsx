"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, GraduationCap } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const EducationStep = ({ next, previous, formData, updateForm }) => {
  const [educationList, setEducationList] = useState(formData.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const schema = z.object({
    degree: z.string().min(2, { message: "degree is required" }),
    institution: z.string().min(2, { message: "intustion is required" }),
    startYear: z.string({ message: "date is required" }),
    endYear: z.string({ message: "end date is required" }),
    grade: z.string({ message: "grade is required" }),
    description: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      grade: "",
      description: "",
    },
  });

  useEffect(() => {
    updateForm({ education: educationList });
  }, [educationList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setEducationList((prev) =>
        prev.map((edu) =>
          edu.id === editingId ? { ...values, id: editingId } : edu
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setEducationList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (education) => {
    form.reset(education);
    setIsEditing(true);
    setEditingId(education.id);
  };

  const handleDelete = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
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

      console.log(isValid);
      if (!isValid) {
        toast("Please fill in all education field before generating");
      } else {
        setIsGenerating(true);

        const res = await axios.post("/api/gen/description", {
          type: "education",
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
        <Card className="bg-white rounded-lg shadow-md p-0 ">
          <CardHeader className="flex items-center justify-between bg-linear-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-gray-800 ">
              {isEditing ? "Edit Education" : "Add Education"}
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
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree/Qualification *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Bachelor of Science"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution/School *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., MIT, Harvard" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 2018"
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
                    name="endYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 2022"
                            type={"month"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade/GPA</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3.8 GPA" {...field} />
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

                <div className=" flex justify-end gap-2 items-center ">
                  <Button
                    type="submit"
                    className="bg-linear-to-b from-indigo-600 to-purple-600"
                  >
                    <Plus className=" h-4 mr-2" />
                    {isEditing ? "Update Education" : "Add Education"}
                  </Button>
                  <Button
                    className={"bg-linear-to-b from-indigo-600 to-purple-600"}
                    onClick={next}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className={"p-0"}>
            <div className=" bg-blue-50 p-4 w-full">
              <h3 className="font-medium text-blue-900 mb-2">
                Tips for adding education:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Include all relevant degrees, certifications</li>
                <li>• Add your most recent qualification first</li>
                <li>• Mention online courses if relevant</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-linear-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Education Review
            </CardTitle>
          </CardHeader>

          <CardContent>
            {educationList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No education qualifications added yet.</p>
                <p className="text-sm">
                  Add your first qualification using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {educationList.map((education, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {education.degree}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {education.institution}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleEdit(education)}
                          size="icon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(education.id)}
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Duration:</span>{" "}
                        {education.startYear} - {education.endYear || "Present"}
                      </div>
                      {education.grade && (
                        <div>
                          <span className="font-medium">Grade:</span>{" "}
                          {education.grade}
                        </div>
                      )}
                    </div>

                    {education.description && (
                      <p className="text-gray-700 text-sm">
                        {education.description}
                      </p>
                    )}
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

export default EducationStep;
