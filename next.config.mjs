/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
  outputFileTracingIncludes: {
    "/api/ats-checker/analyze": [
      "./node_modules/pdf-parse/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs",
    ],
  },

  // Keep disabled unless you explicitly need it
  // reactCompiler: true,
  // Disabled because Cloudflare/Vercel Edge handles Brotli/Gzip much more efficiently
  compress: true,
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: false,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    loader: "custom",
    loaderFile: "./src/shared/utils/cloudflareLoader.js",
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },

  async redirects() {
    return [
      { source: "/ats-resume-tips", destination: "/ats-resume-checker", permanent: true },
      {
        source: "/how-to-make-ats-friendly-resume",
        destination: "/ats-resume-checker",
        permanent: true,
      },
      { source: "/ats-resume-mistakes", destination: "/ats-resume-checker", permanent: true },
      { source: "/what-is-ats-resume", destination: "/ats-resume-checker", permanent: true },
      { source: "/best-resume-builder-india", destination: "/templates", permanent: true },
      { source: "/online-resume-maker-india", destination: "/templates", permanent: true },
      {
        source: "/resume-vs-cv-difference",
        destination: "/career/software-engineer-resume-guide",
        permanent: true,
      },
      {
        source: "/hr-interview-questions-and-answers",
        destination: "/career/hr-manager-interview-questions",
        permanent: true,
      },
      { source: "/resume-builder-pricing-india", destination: "/pricing", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },

  // cacheComponents: true,
  experimental: {
    cssChunking: true,
    optimizeCss: true,
    optimizePackageImports: ["lodash", "lucide-react", "@heroicons/react", "date-fns", "react-pdf"],
  },
};

export default withBundle(nextConfig);
