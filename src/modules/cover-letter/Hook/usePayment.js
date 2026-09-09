import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRazorpay } from "react-razorpay";

export const usePayment = ({ coverLetter, couponCode, draftId }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isPaymentSubmit, setIsSubmit] = useState(false);
  const { error, isLoading, Razorpay } = useRazorpay();

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
      toast.error(error.message || "Payment initialization failed");
    } finally {
      setIsSubmit(false);
    }
  };

  return { handelPayment, isRedirecting, isPaymentSubmit, isLoading, error };
};
