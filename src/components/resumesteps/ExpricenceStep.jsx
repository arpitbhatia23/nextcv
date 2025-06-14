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

const ExperienceStep = ({ next, previous, formData, updateForm }) => {
  const [experienceList, setExperienceList] = useState(
    formData.experience || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const form = useForm({
    defaultValues: {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    updateForm({ experience: experienceList });
  }, [experienceList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setExperienceList((prev) =>
        prev.map((exp) =>
          exp.id === editingId ? { ...values, id: editingId } : exp
        )
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

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-gradient-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
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

                <div className="flex justify-end gap-2 items-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-b from-indigo-600 to-purple-600"
                  >
                    <Plus className="h-4 mr-2" />
                    {isEditing ? "Update Experience" : "Add Experience"}
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
          <CardHeader className="flex items-center mb-6 bg-gradient-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Experience Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {experienceList.length === 0 ? (
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
