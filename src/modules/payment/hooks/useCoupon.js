import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useCoupon = ({ setIsSubmit, originalAmount, setAmount, setCouponCode }) => {
  const [isCouponValid, setIsCouponValid] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [applied, setApplied] = useState(false);

  const handleCoupon = async coupon => {
    if (appliedCoupon === coupon) {
      toast.info("This coupon is already applied");
      return;
    }

    setIsSubmit(true);

    try {
      const res = await axios.post("/api/coupons/getByCouponCode", {
        couponCode: coupon,
      });

      const couponData = res.data.data;

      const discountInfo = {
        type: couponData.type,
        value: couponData.discount,
      };

      setDiscount(discountInfo);
      setApplied(true);
      setAppliedCoupon(coupon);
      setIsCouponValid(true);

      let finalAmount = originalAmount;

      if (discountInfo.type === "percentage") {
        finalAmount = originalAmount * (1 - discountInfo.value / 100);
      } else if (discountInfo.type === "amount") {
        finalAmount = originalAmount - discountInfo.value;
      }

      finalAmount = Math.max(Math.round(finalAmount), 0);
      setAmount(finalAmount);

      toast.success("Coupon applied successfully");
    } catch (error) {
      setDiscount(null);
      setApplied(false);
      setAppliedCoupon(null);
      setIsCouponValid(false);
      setAmount(originalAmount);
      setCouponCode("");
      console.log(error?.response?.data);
      toast.error(error?.response?.data || "Invalid coupon code");
    } finally {
      setIsSubmit(false);
    }
  };

  const removeCoupon = () => {
    setAmount(originalAmount);
    setDiscount(null);
    setApplied(false);
    setCouponCode("");
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  return { handleCoupon, discount, removeCoupon, applied };
};
