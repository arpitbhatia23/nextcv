"use client";

import { useEffect } from "react";

const ClarityComponent = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const loadClarity = async () => {
      const Clarity = (await import("@microsoft/clarity")).default;
      Clarity.init("vkw299o6bb");
    };

    loadClarity();
  }, []);

  return null;
};

export default ClarityComponent;
