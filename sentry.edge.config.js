import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.sentry_dns,

  // Lower this for production to reduce performance overhead
  // 1.0 is 100%, 0.1 is 10%.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Disable internal Sentry logs to shrink bundle size
  debug: false,
  enableLogs: true,
  // Only send PII if absolutely necessary for your AI Resume builder logic
  sendDefaultPii: false,

  // This ensures Sentry doesn't try to initialize in non-production
  // environments unless you specifically want it to.
  enabled: process.env.NODE_ENV === "production",
});
