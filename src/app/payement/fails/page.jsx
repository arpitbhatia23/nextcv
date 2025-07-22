"use client";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PaymentFailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status !== "fail") {
      router.push("/dashboard");
    }
    const timerId = setTimeout(() => {
      router.push("/dashboard");
    }, 9000);
    return () => clearTimeout(timerId);
  }, [status, router]);

  if (status !== "fail") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-4">
          Oops! Something went wrong while processing your payment.
        </p>
        <p className="text-gray-700 text-sm mb-6">
          If money has been debited from your account, it will be automatically
          refunded to your bank via <strong>PhonePe</strong> within{" "}
          <strong>5–7 business days</strong>.
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PaymentFailContent />
    </Suspense>
  );
}
