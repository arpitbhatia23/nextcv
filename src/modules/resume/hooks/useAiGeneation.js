import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useAiGeneration = ({
  form = null,
  type = "general",
  field = "description",
  getPayload, // custom payload builder
  onSuccess, // custom handler (for skills etc.)
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGeneration = async () => {
    try {
      let payloadData = {};

      // ✅ If custom payload provided (skills case)
      if (getPayload) {
        payloadData = getPayload();
        console.log(payloadData);
      }
      // ✅ Default form-based payload
      else if (form) {
        const formData = form.getValues();

        const isValid = Object.entries(formData)
          .filter(([key]) => key !== field)
          .some(([, val]) => val && String(val).trim() !== "");

        if (!isValid) {
          toast(`Please fill required fields before generating ${type}`);
          return;
        }

        payloadData = formData;
      } else {
        toast("No data provided for AI generation");
        return;
      }

      setIsGenerating(true);

      const res = await axios.post("/api/gen/description", {
        type,
        data: payloadData,
      });

      const result = res.data?.data;

      if (!result) {
        toast("No response from AI");
        return;
      }

      // ✅ Custom handler (skills etc.)
      if (onSuccess) {
        onSuccess(result);
      }
      // ✅ Default form handler
      else if (form) {
        form.setValue(field, String(result));
      }

      toast("✨ AI content generated!");
    } catch (err) {
      toast(err.message || "Something went wrong while generating 😓");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleAiGeneration,
    isGenerating,
  };
};
