"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  Award,
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";

const CertificateSection = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);

  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
    <div className="space-y-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-5">
          <Card className="border shadow-sm border-slate-100 bg-white rounded-2xl overflow-hidden">
            <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />{" "}
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
                  className="h-6 text-[10px] font-bold text-slate-400"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs">
                          Certification Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. AWS Certified..."
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                          <Building className="w-3 h-3 text-indigo-500" /> Issuing Org
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Amazon"
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-indigo-500" /> Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
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
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <ExternalLink className="w-3 h-3 text-indigo-500" /> URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 rounded-xl mt-2 text-sm"
                  >
                    {isEditing ? "Save" : "Add to Resume"}
                    <Plus className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* List Column */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AnimatePresence initial={false}>
              {certList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center"
                >
                  <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">No certificates</p>
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
                    <Card className="group relative border shadow-xs bg-white rounded-xl overflow-hidden border-slate-100 h-full">
                      <CardContent className="p-4 flex flex-col h-full justify-between gap-3">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {cert.title}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {cert.organization}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-auto">
                          <span className="text-[10px] font-bold text-slate-400">{cert.year}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(cert)}
                              className="p-1 text-slate-300 hover:text-indigo-600"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(cert.id)}
                              className="p-1 text-slate-300 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateSection);
