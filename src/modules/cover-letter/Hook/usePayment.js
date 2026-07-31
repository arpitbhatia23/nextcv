import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const usePayment = ({ coverLetter, couponCode, draftId }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isPaymentSubmit, setIsSubmit] = useState(false);
  const handelPayment = async () => {
    try {
      setIsSubmit(true);

      const paymentData = {
        ...coverLetter,
        couponCode,
        draftId: draftId || coverLetter._id || null,
        productType: "cover-letter",
      };

      const res = await axios.post("/api/payment/order", paymentData);

      if (res.data.success) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = res.data.data.redirectUrl;
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Payment initialization failed");
    } finally {
      setIsSubmit(false);
    }
  };

  return { handelPayment, isRedirecting, isPaymentSubmit };
};
