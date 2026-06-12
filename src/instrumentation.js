export async function register() {
  if (!process.env.SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export async function onRequestError(error, request, context) {
  if (!process.env.SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  const Sentry = await import("@sentry/nextjs");
  return Sentry.captureRequestError(error, request, context);
}
