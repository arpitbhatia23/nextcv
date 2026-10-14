import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables");
}

let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = {
    conn: null,
    promise: null,
  };
}

const dbConnect = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "nextcv",
        serverSelectionTimeoutMS: 10000,
      })
      .then(mongooseInstance => mongooseInstance)
      .catch(error => {
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;

    console.log("MongoDB connected successfully");

    return cached.conn;
  } catch (error) {
    cached.conn = null;

    console.error("MongoDB connection error:", {
      name: error.name,
      message: error.message,
    });

    throw error;
  }
};

export default dbConnect;
