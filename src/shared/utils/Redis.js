import Redis from "ioredis";

const globalForRedis = global;

console.time("redist export");
export const redis =
  globalForRedis.redis ||
  new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    connectTimeout: 10000,
    enableReadyCheck: true,

    retryStrategy(times) {
      return Math.min(times * 50, 2000);
    },

    reconnectOnError(err) {
      const targetError = "READONLY";
      return err.message.includes(targetError);
    },
  });

console.timeEnd("redist export");

// 🧠 Prevent multiple connections in dev (Next.js hot reload)
if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

// 🔍 Debug logs (optional)
redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", err => console.error("❌ Redis error:", err));
