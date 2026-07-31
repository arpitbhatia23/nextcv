import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useDraft = ({ data, setDraftId }) => {
  console.log(data);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSaveDraft = async () => {
    try {
      setIsSubmit(true);
      const res = await axios.post("/api/cover-letter/savedraft", {
        data,
      });

      if (res.data.success) {
        toast.success("Draft saved successfully");
        console.log(res.data.data);
        setDraftId(res.data.data);
      } else {
        console.log(res.data);
        toast.error(res.data.message || "Failed to save draft");
      }
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
      toast.error("Error saving draft");
    }
  };

  return { handleSaveDraft, isdraftSubmit: isSubmit };
};
