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

const CertificateStep = ({ next, previous, formData, updateForm }) => {
  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const schema = z.object({
    title: z.string().min(2, { message: "Certificate name is required" }),
    organization: z
      .string()
      .min(2, { message: "Issuing organization is required" }),
    year: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      organization: "",
      year: "",
      credentialUrl: "",
    },
  });

  useEffect(() => {
    updateForm({ certificates: certList });
  }, [certList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setCertList((prev) =>
        prev.map((cert) =>
          cert.id === editingId ? { ...values, id: editingId } : cert
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setCertList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (cert) => {
    form.reset(cert);
    setIsEditing(true);
    setEditingId(cert.id);
  };

  const handleDelete = (id) => {
    setCertList((prev) => prev.filter((cert) => cert.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-linear-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Certificate" : "Add Certificate"}
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Google Data Analytics"
                          {...field}
                        />
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
                      <FormLabel>Issuing Organization *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Google, IBM, Coursera"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2024" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credentialUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential URL (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://certificate-link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="submit"
                    className="bg-linear-to-b from-indigo-600 to-purple-600"
                  >
                    <Plus className="h-4 mr-2" />
                    {isEditing ? "Update Certificate" : "Add Certificate"}
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

          <CardFooter>
            <div className="bg-blue-50 p-4 w-full">
              <h3 className="font-medium text-blue-900 mb-2">
                Tips for certificates:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Add only relevant certifications</li>
                <li>• Prefer industry-recognized platforms</li>
                <li>• Avoid fake or outdated certificates</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-linear-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              Certificates Preview
            </CardTitle>
          </CardHeader>

          <CardContent>
            {certList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No certificates added yet.</p>
                <p className="text-sm">
                  Add certifications to strengthen your resume.
                </p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {certList.map((cert) => (
                  <div
                    key={cert.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {cert.organization}
                          {cert.year && ` • ${cert.year}`}
                        </p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            className="text-sm text-blue-600 underline"
                          >
                            View Credential
                          </a>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(cert)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(cert.id)}
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

export default CertificateStep;
