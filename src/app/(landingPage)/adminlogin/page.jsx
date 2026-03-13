import { LoginForm } from "@/components/login-form";
export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  title: "Admin Login | NextCV",
  description: "Admin login portal for NextCV.",
  openGraph: {
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `https://www.nextcv.in/adminlogin`,
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
