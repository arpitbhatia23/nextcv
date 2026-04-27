"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  Award,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Building,
  ExternalLink,
} from "lucide-react";
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
import { Card, CardContent } from "@/shared/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Tips } from "../Tips";
import { useRouter } from "next/navigation";

const CertificateV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/summary");
  }, [router]);

  const form = useForm({
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

  return (
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Honors & Certs
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Validate your skills with official credentials.
            </p>
          </div>

          <Card
            className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden"
            id="tour-certificates-form-v2"
          >
            <div className="bg-indigo-600/5 px-4 md:px-6 py-3 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-[10px] md:text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 md:w-4 h-3 md:h-4" />{" "}
                {isEditing ? "Modify Credential" : "New Achievement"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                  className="h-7 md:h-8 text-[10px] md:text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                          Certification Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. AWS Cloud Practitioner"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Building className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Issuing Body
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Amazon, Google, etc."
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Calendar className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Completion Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="credentialUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <ExternalLink className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Verification URL (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://credly.com/..."
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-11 md:h-14 rounded-xl md:rounded-2xl transition-all group text-xs md:text-sm"
                  >
                    {isEditing ? "Save Changes" : "Register Credential"}
                    <Plus className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* List Column */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
              Live Preview
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {certList.length} Units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="tour-certificates-list-v2">
            <AnimatePresence initial={false}>
              {certList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-4xl p-12 md:p-16 text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 md:w-10 md:h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-bold text-xs md:text-sm">No honors added yet.</p>
                </motion.div>
              ) : (
                certList.map(cert => (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Card className="group relative border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-xl md:rounded-4xl transition-all overflow-hidden border border-slate-50">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col h-full justify-between gap-4">
                          <div className="space-y-2">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                              <Award className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                            </div>
                            <h4 className="font-black text-slate-900 leading-snug text-xs md:text-base line-clamp-2">{cert.title}</h4>
                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest truncate">
                              {cert.organization}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-1">
                            <span className="text-[10px] md:text-xs font-black text-slate-300">
                              {cert.year}
                            </span>
                            <div className="flex gap-1 md:gap-2">
                              <button
                                onClick={() => handleEdit(cert)}
                                className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors hover:bg-slate-50 rounded-lg"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(cert.id)}
                                className="p-1.5 text-slate-300 hover:text-red-500 transition-colors hover:bg-slate-50 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <Tips section={"certificates"} />
          <div className="pt-6 md:pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-11 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs md:text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Previous
            </Button>
            <Button
              onClick={next}
              className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all text-xs md:text-sm"
              id="tour-next-button-v2"
            >
              Final Review <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateV2);

