import { checkRateLimit, rateLimiter } from "../rateLimiter";

describe("rateLimiter utility", () => {
  it("should return true when rate limit is not exceeded", async () => {
    const ip = "127.0.0.1";
    // Since RateLimiterMemory is real and we want to test the wrapper:
    const result = await checkRateLimit(ip);
    expect(result).toBe(true);
  });

  it("should return false when rate limit is exceeded", async () => {
    const ip = "1.2.3.4";
    // Consume all points (points: 5)
    for (let i = 0; i < 5; i++) {
        await rateLimiter.consume(ip);
    }
    
    // Next one should fail
    const result = await checkRateLimit(ip);
    expect(result).toBe(false);
  });
});
