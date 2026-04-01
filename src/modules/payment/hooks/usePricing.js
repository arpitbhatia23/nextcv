import { getTemplateByName } from "@/modules/resume/services/templateMap";
import { useEffect, useState } from "react";

export const usePricing = ({
  selectedTemplate,
  applied,
  originalAmount,
  discount,
  setAmount,
  setOriginalAmount,
}) => {
  const [basePrice, setBasePrice] = useState("");
  useEffect(() => {
    const templateData = getTemplateByName(selectedTemplate);
    console.log(templateData);
    if (templateData?.priceDiscounted) {
      setOriginalAmount(templateData.priceDiscounted);
      setBasePrice(templateData.priceOriginal);
      // If no coupon applied yet, set amount = base price
      if (!applied) setAmount(templateData.priceDiscounted);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (discount) {
      let finalAmount = originalAmount;

      if (discount.type === "percentage") {
        finalAmount = originalAmount * (1 - discount.value / 100);
      } else if (discount.type === "amount") {
        finalAmount = originalAmount - discount.value;
      }

      finalAmount = Math.max(Math.round(finalAmount), 0);
      setAmount(finalAmount);
    }
  }, [originalAmount, discount]);

  return { basePrice };
};
