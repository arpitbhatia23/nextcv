import { LoginForm } from "@/components/login-form";
export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  title: "Free AI Resume Builder for India – ATS Friendly | NextCV",
  description: "Create a professional ATS-friendly resume in under 1 minute.",
  openGraph: {
    images: ["/opengraph-image.png"],
  },
};
export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
