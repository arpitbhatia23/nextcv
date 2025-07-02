"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrainCircuit } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const SummaryStep = ({ next, previous, formData, updateForm }) => {
  const [summary, setSummary] = useState(formData.summary || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const schema = z.object({
    summary: z.string().min(20, { message: "summary is reuired" }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: "",
    },
  });

  useEffect(() => {
    updateForm({ summary });
  }, [summary]);

  const onSubmit = (values) => {
    setSummary(values.summary);
    form.reset();
  };

  const handelAiGenration = async () => {
    try {
      setIsGenerating(true);

      const res = await axios.post("/api/gen/description", {
        type: "summary",
        data: formData,
      });

      if (res.data?.data) {
        form.setValue("summary", String(res.data.data));
      }
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-gradient-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-white">
              Add Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>sumarry</FormLabel>
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
                    className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
                  >
                    Save Summary
                  </Button>
                  <Button
                    type="button"
                    className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
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
          <CardHeader className="flex items-center mb-6 bg-gradient-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <BrainCircuit className="w-6 h-6 text-white mr-2" />
            <CardTitle className="text-2xl font-bold text-white">
              Summary Preview
            </CardTitle>
          </CardHeader>

          <CardContent>
            {summary ? (
              <div className="border border-gray-200 rounded-lg p-4 text-gray-800 text-sm">
                {summary}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No summary added yet.</p>
                <p className="text-sm">Add your professional summary above.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryStep;
