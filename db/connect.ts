import mongoose from "mongoose";
// import { Overview } from "./models";

interface Mongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const { MONGODB_URI } = process.env;

let global = { mongoose: { conn: null, promise: null } }; // TS

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached: Mongoose = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI variable inside .env");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // const options = { bufferCommands: false };

    // cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      // Overview; //:: chatti
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
