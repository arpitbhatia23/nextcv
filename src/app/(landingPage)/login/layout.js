import AuthProvider from "@/context/authprovider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in/login"),

  title: {
    default: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools ",
  },
  description:
    "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
  robots: {
    index: false,
    follow: true,
  },

  alternates: {
    canonical: "https://www.nextcv.in/login",
  },
  openGraph: {
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextCV ATS resume builder",
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
