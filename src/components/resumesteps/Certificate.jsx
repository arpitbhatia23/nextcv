"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Sparkles, FolderYi, ArrowRight, ArrowLeft, Award } from "lucide-react";
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
    <div className="py-8">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Certifications</h2>
          <p className="text-slate-500">Add your credentials and awards</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  {isEditing ? "Edit Certificate" : "Add Certificate"}
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
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Certificate Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Google Data Analytics"
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
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Issuing Organization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Google, Coursera"
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
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Year (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2024" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credentialUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Credential URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://..."
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-11 rounded-lg"
                  >
                     {isEditing ? "Update Certificate" : "Add Certificate"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="bg-blue-50 p-4 w-full rounded-b-xl">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                 <Award className="w-4 h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-1 pl-6 list-disc">
                 <li>Add valid certifications that are relevant to your career.</li>
                 <li>Include the link to verify your credential if available.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
           <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                 <Award className="w-5 h-5 text-indigo-500" /> Added Certificates
              </h3>

            {certList.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                   <p className="text-slate-400 text-sm">No certifications added yet.</p>
                </div>
            ) : (
              <div className="space-y-3">
                {certList.map((cert) => (
                   <div key={cert.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-indigo-300 transition-colors">
                      <div className="flex justify-between items-start">
                         <div>
                             <h4 className="font-bold text-slate-800">{cert.title}</h4>
                             <div className="text-sm text-indigo-600 font-medium">
                                {cert.organization}
                                {cert.year && <span className="text-slate-400 ml-1">({cert.year})</span>}
                             </div>
                             {cert.credentialUrl && (
                                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block">
                                   View Credential
                                </a>
                             )}
                         </div>
                         <div className="flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => handleEdit(cert)}>
                                <Edit2 className="w-3.5 h-3.5" />
                             </Button>
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(cert.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                             </Button>
                          </div>
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
              <Button onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8">
                 Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateStep;
