// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

Sentry.init({
  dsn,
  enabled: isProduction && Boolean(dsn),
  debug: false,
  tracesSampleRate: isProduction ? 0.1 : 0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
