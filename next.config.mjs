/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  // Keep disabled unless you explicitly need it
  // reactCompiler: true,
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "lodash",
      "lucide-react",
      "@heroicons/react",
      "date-fns",
      "react-pdf",
    ],
  },
};

export default withBundle(nextConfig);
