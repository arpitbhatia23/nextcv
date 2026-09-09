import useResumeStore from "@/store/useResumeStore";
import axios from "axios";
import { useState } from "react";
import { useRazorpay } from "react-razorpay";
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
  const { error, isLoading, Razorpay } = useRazorpay();
  const clearDraft = useResumeStore(s => s.clearStorage);
  const [isRedirecting, setisRedirecting] = useState(false);
  const handelPayment = async () => {
    if (couponCode && !applied) {
      toast.error("Please apply a valid coupon before payment");
      return;
    }

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
        productType: "resume",
        discountAmount,
        ...({ ...formData, draftId } || {}),
        isDraft: !!draftId,
      });

      if (!res.data.success) {
        toast.error("Unable to create payment order");
        return;
      }

      const option = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID,

        amount: res.data.data.amount,

        currency: "INR",

        name: "NEXTCV.IN",

        description: "NEXTCV Transaction",

        order_id: res.data.data.id,

        handler: async response => {
          try {
            // Payment completed in Razorpay

            const { data } = await axios.post("/api/payment/status", {
              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_signature: response.razorpay_signature,
            });

            if (data.success) {
              toast.success("Payment Successful!");
              clearDraft();
              window.location.href = data.data.redirecturl;
              return;
            }

            // Verification failed

            toast.error(data.message || "Payment verification failed");
          } catch (error) {
            console.error("Payment verification failed:", error?.response?.data || error?.message);

            toast.error("Payment verification failed");
          }
        },
      };

      const razorpay = new Razorpay(option);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Payment initialization failed");
    } finally {
      setIsSubmit(false);
    }
  };

  return {
    handelPayment,
    isRedirecting,
    isLoading,
    error,
  };
};
