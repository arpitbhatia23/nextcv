// lib/rateLimiter.js
import { RateLimiterMemory } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 10 seconds per IP
});

export async function checkRateLimit(ip) {
  try {
    await rateLimiter.consume(ip); // consume 1 point
    return true;
  } catch {
    return false; // limit exceeded
  }
}
