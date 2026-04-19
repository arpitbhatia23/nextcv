import useResumeStore from "@/store/useResumeStore";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const usePayment = ({
  discount,
  originalAmount,
  formData,
  applied,
  selectedTemplate,
  couponCode,
  setIsSubmit,
  draftId,
}) => {
  const clearDraft = useResumeStore(s => s.clearStorage);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handelPayment = async () => {
    console.log(applied, couponCode);
    if (couponCode && !applied) {
      toast.error("Please apply a valid coupon before payment");
      return;
    }

    console.log(formData);
    try {
      setIsSubmit(true);

      const payAmount =
        discount?.type === "percentage"
          ? Math.floor(originalAmount * (1 - discount.value / 100))
          : discount?.type === "amount"
            ? Math.max(originalAmount - discount.value, 0)
            : originalAmount;

      const discountAmount =
        discount?.type === "percentage"
          ? Math.round(originalAmount * (discount.value / 100))
          : discount?.type === "amount"
            ? discount.value
            : 0;
      const res = await axios.post("/api/payment/order", {
        amount: payAmount * 100,
        ResumeType: selectedTemplate,
        couponCode: applied ? couponCode : null,
        discountAmount,
        ...({ formData, draftId } || {}),
        isDraft: draftId ? true : false,
      });

      if (res.data.success) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = res.data.data.redirectUrl;
        }, 2000);
        clearDraft();
      }
    } catch (error) {
      toast.error(error.message || "Payment initialization failed");
    } finally {
      setIsSubmit(false);
    }
  };

  return { handelPayment, isRedirecting };
};
