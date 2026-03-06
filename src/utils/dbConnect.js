import mongoose from "mongoose";
import dns from "dns/promises";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        dbName: "nextcv",
        ssl: true,
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;

    console.log(`MongoDB connected: ${cached.conn.connection.host}`);

    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnect;
