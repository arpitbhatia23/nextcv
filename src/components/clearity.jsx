"use client";

import { useEffect } from "react";

const ClarityComponent = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const loadClarity = async () => {
      const Clarity = (await import("@microsoft/clarity")).default;
      Clarity.init("vkw299o6bb");
    };
    setTimeout(() => {
      loadClarity();
    }, 3000);
  }, []);

  return null;
};

export default ClarityComponent;
