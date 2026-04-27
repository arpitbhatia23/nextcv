"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, ArrowRight, ArrowLeft, Award } from "lucide-react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tips } from "../Tips";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

const CertificateStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/summary");
  }, [router]);

  const schema = z.object({
    title: z.string().min(2, { message: "Certificate name is required" }),
    organization: z.string().min(2, { message: "Issuing organization is required" }),
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

  const onSubmit = values => {
    if (isEditing) {
      setCertList(prev =>
        prev.map(cert => (cert.id === editingId ? { ...values, id: editingId } : cert))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setCertList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = cert => {
    form.reset(cert);
    setIsEditing(true);
    setEditingId(cert.id);
  };

  const handleDelete = id => {
    setCertList(prev => prev.filter(cert => cert.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Certifications</h2>
        <p className="text-[10px] md:text-sm text-slate-500">Add your credentials and awards</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          id="tour-certificates-form"
        >
          <CardHeader className="border-b bg-slate-50/50 p-3 md:p-4 rounded-t-xl flex flex-row justify-between items-center gap-2">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
              {isEditing ? "Edit Certificate" : "Add Certificate"}
            </CardTitle>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-7 text-[10px] md:text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </Button>
            )}
          </CardHeader>

          <CardContent className="p-3 md:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                        Certificate Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. AWS Expert"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                        Issuing Organization
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Google"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                          Year (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 2024"
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="credentialUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                          Link (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 md:h-11 rounded-lg text-xs md:text-sm"
                  >
                    {isEditing ? "Update Entry" : "Save Certificate"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="bg-blue-50/50 p-3 md:p-4 w-full border-t border-blue-100">
              <h3 className="text-[10px] md:text-sm font-bold text-blue-900 mb-2 flex items-center gap-2 uppercase tracking-tight">
                <Award className="w-3 md:w-4 h-3 md:h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-[10px] md:text-sm text-blue-800/80 space-y-1 pl-4 list-disc font-medium">
                <li>Focus on certifications relevant to the target job.</li>
                <li>Add a link to the certificate ID if possible.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="bg-slate-50 rounded-xl border border-slate-200 p-4 md:p-5"
            id="tour-certificates-list"
          >
            <h3 className="text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-indigo-500" /> Verified Credentials
            </h3>

            {certList.length === 0 ? (
              <div className="text-center py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                <p className="text-slate-400 text-xs">No certifications added.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {certList.map(cert => (
                  <div
                    key={cert.id}
                    className="bg-white p-3 md:p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm truncate">{cert.title}</h4>
                        <div className="text-[10px] md:text-xs text-indigo-600 font-medium truncate">
                          {cert.organization}
                          {cert.year && <span className="text-slate-400 ml-1 font-normal">({cert.year})</span>}
                        </div>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[9px] md:text-xs text-blue-500 hover:underline mt-1 inline-block font-bold"
                          >
                            Verify Link ↗
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          onClick={() => handleEdit(cert)}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(cert.id)}
                        >
                          <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Tips section={"certificates"} />
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                router.push("/dashboard/builder/projects");
              }}
              className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={() => {
                router.push("/dashboard/builder/summary");
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
              id="tour-next-button"
            >
              Summary Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateStep);

