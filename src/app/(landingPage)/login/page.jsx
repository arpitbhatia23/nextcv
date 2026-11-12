"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestedUrl = searchParams.get("callbackUrl");

  const callbackUrl =
    requestedUrl?.startsWith("/") && !requestedUrl.startsWith("//") ? requestedUrl : "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await signIn("google", { callbackUrl });
    } catch {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div
        data-login-shell
        className="mt-16 flex min-h-[calc(100svh-4rem)] items-center justify-center bg-[#F8F7F3]"
      >
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#DDE2D9] border-t-[#344B38]"
          role="status"
          aria-label="Loading account"
        />
      </div>
    );
  }

  return (
    <div
      data-login-shell
      className="mt-16 flex min-h-[calc(100svh-4rem)] flex-col bg-[#F8F7F3] text-[#1C261E]"
    >
      <div className="grid flex-1 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden min-h-0 overflow-hidden bg-[#243427] px-10 py-9 text-white lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-11">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_0%,transparent_55%,#8EA38D_55.2%,transparent_55.5%),linear-gradient(35deg,transparent_0%,transparent_75%,#8EA38D_75.2%,transparent_75.5%)] opacity-15" />
          <div className="absolute -bottom-44 -left-28 h-120 w-120 rounded-full border border-[#A9BCA5]/20" />
          <div className="absolute -bottom-28 -left-8 h-88 w-88 rounded-full border border-[#A9BCA5]/15" />
          <div className="absolute right-0 top-0 h-56 w-56 bg-[#456B4A]/20 blur-3xl" />

          <div className="relative z-10 flex items-center justify-between gap-5">
            <Link href="/" aria-label="NextCV home" className="inline-flex shrink-0 items-center">
              <Image
                src="/logos/nextcvlogolight.png"
                alt="NextCV"
                width={360}
                height={130}
                priority
                unoptimized
                className="h-16 w-52 object-contain object-left xl:h-18 xl:w-60"
              />
            </Link>
            <span className="hidden border-l border-[#71866F] pl-4 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-[#B8C9B4] xl:block">
              Career tools
              <br />
              for your next move
            </span>
          </div>

          <div className="relative z-10 -mt-12 max-w-xl xl:-mt-20">
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#B8C9B4]">
              <span className="h-px w-8 bg-[#8EA38D]" />
              Your next chapter starts here
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.06] xl:text-6xl">
              Make your
              <br />
              experience count.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#D5DDD3] xl:text-base">
              Turn the work you’ve done into a clear, confident story for what comes next.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-[#D5DDD3]">
              <span className="flex h-7 w-7 items-center justify-center border border-[#71866F] text-[#B8C9B4]">
                01
              </span>
              <span>Shape your story. Make your next move.</span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-12 right-8 z-10 hidden w-[34%] max-w-64 rotate-[4deg] border border-[#DDE2D9]/70 bg-[#F8F7F3] p-4 text-[#243427] shadow-[0_24px_70px_rgba(0,0,0,0.28)] xl:block"
          >
            <div className="border-b border-[#DDE2D9] pb-3">
              <div className="h-2 w-24 bg-[#344B38]" />
              <div className="mt-2 h-1 w-32 bg-[#C9D2C7]" />
            </div>
            <div className="space-y-3 py-4">
              <div>
                <div className="mb-2 h-1 w-12 bg-[#456B4A]" />
                <div className="space-y-1.5">
                  <div className="h-1 w-full bg-[#DDE2D9]" />
                  <div className="h-1 w-5/6 bg-[#DDE2D9]" />
                </div>
              </div>
              <div>
                <div className="mb-2 h-1 w-16 bg-[#456B4A]" />
                <div className="space-y-1.5">
                  <div className="h-1 w-full bg-[#DDE2D9]" />
                  <div className="h-1 w-4/5 bg-[#DDE2D9]" />
                  <div className="h-1 w-11/12 bg-[#DDE2D9]" />
                </div>
              </div>
              <div>
                <div className="mb-2 h-1 w-10 bg-[#456B4A]" />
                <div className="flex gap-1.5">
                  <span className="h-4 w-12 bg-[#E8EFE5]" />
                  <span className="h-4 w-10 bg-[#E8EFE5]" />
                  <span className="h-4 w-14 bg-[#E8EFE5]" />
                </div>
              </div>
            </div>
            <span className="absolute -left-5 bottom-8 border border-[#71866F] bg-[#344B38] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-wider text-white">
              Ready for what’s next
            </span>
          </div>

          <p className="relative z-10 font-mono text-[9px] uppercase tracking-wider text-[#AEBBAA]">
            © {new Date().getFullYear()} NextCV
          </p>
        </section>

        <section className="flex min-w-0 flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-105">
            <div className="mb-9">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#456B4A]">
                Welcome to NextCV
              </p>
              <h2 className="font-display text-4xl font-medium leading-tight text-[#1C261E]">
                Welcome back
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#5A665B]">
                Sign in to access your account and continue building your professional resume.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex min-h-14 w-full items-center justify-center gap-3 border border-[#DDE2D9] bg-white px-5 py-4 text-sm font-semibold text-[#263427] transition-colors hover:border-[#BFCDBB] hover:bg-[#F1F5EF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#DDE2D9] border-t-[#344B38]" />
                  Signing you in...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.3 0-9.8-3.6-11.4-8.4H5.7v5.3A20 20 0 0 0 24 44z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.7a20 20 0 0 0 0 18z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.7 15l6.9 5.3c1.6-4.8 6.1-8.2 11.4-8.2z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {error && (
              <p role="alert" className="mt-4 text-sm text-[#A33B32]">
                {error}
              </p>
            )}

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#DDE2D9]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A857A]">
                Secure authentication
              </span>
              <div className="h-px flex-1 bg-[#DDE2D9]" />
            </div>

            <p className="text-center text-sm leading-6 text-[#5A665B]">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-semibold text-[#344B38] underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#344B38] underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-10 border-t border-[#DDE2D9] pt-6 text-center">
              <Link
                href="/"
                className="text-sm text-[#5A665B] transition-colors hover:text-[#344B38]"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
      <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#DDE2D9] px-5 py-3 text-[11px] text-[#5A665B] sm:justify-between sm:px-8 lg:px-12">
        <a href="mailto:help@nextcv.in" className="transition-colors hover:text-[#344B38]">
          Need help? Contact support
        </a>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="transition-colors hover:text-[#344B38]">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-[#344B38]">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
