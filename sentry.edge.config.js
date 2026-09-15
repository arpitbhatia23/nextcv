import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

Sentry.init({
  dsn,
  debug: false,
  enabled: isProduction && Boolean(dsn),

  // Lower this for production to reduce performance overhead
  // 1.0 is 100%, 0.1 is 10%.
  tracesSampleRate: isProduction ? 0.1 : 0,

  enableLogs: isProduction,
  // Only send PII if absolutely necessary for your AI Resume builder logic
  sendDefaultPii: false,
});
