"use client";

import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/shared/components/site-header";

export default function StartClient({ searchParams }) {
  const query = new URLSearchParams(searchParams).toString();
  const callbackUrl = `/dashboard/resume/new${query ? `?${query}` : ''}`;

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Ready to boost your career?</h1>
          <p className="text-slate-600 mb-8">
            Create a professional, ATS-friendly resume in minutes. Sign in to start building.
          </p>
          
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-slate-300 flex items-center justify-center gap-2 group"
          >
            Start building your resume
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}
