import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  debug: process.env.NODE_ENV !== "production",
  enabled: Boolean(dsn),

  // Lower this for production to reduce performance overhead
  // 1.0 is 100%, 0.1 is 10%.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  enableLogs: true,
  // Only send PII if absolutely necessary for your AI Resume builder logic
  sendDefaultPii: false,
});
