/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizeCss: true, // ✅ merge CSS chunks → faster LCP
    esmExternals: true, // ✅ prevents legacy JavaScript polyfills
    serverActions: { allowedOrigins: ["*"] },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withBundle(nextConfig);
