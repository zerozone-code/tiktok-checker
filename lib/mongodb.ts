import mongoose from "mongoose";

// 1. MongoDB Environment Variable
const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// 2. Cache Type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// 3. Extend Global Type
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// 4. Global Cache
const cached =
  globalThis.mongooseCache ??
  (globalThis.mongooseCache = {
    conn: null,
    promise: null,
  });

// 5. Database Connection
async function dbConnect(): Promise<typeof mongoose> {
  // Already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Create connection if not exists
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
