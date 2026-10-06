"use client";

import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/shared/components/ui/button";

export default function BuildButton({
  children = "Build My Resume",
  callbackUrl = "/dashboard/builder",
  className = "",
}) {
  return (
    <Button
      type="button"
      onClick={() => signIn("google", { callbackUrl })}
      className={`rounded-none! h-12 bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 ${className}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Button>
  );
}
