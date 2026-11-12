"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

export default function BuildButton({
  children = "Build My Resume",
  callbackUrl = "/dashboard/builder",
  className = "",
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;

    setLoading(true);
    router.push(callbackUrl);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`rounded-none! h-12 bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {children}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}
