import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (!MONGO_URL) throw new Error("Mongo Url must be declared");

  if (cached.conn) return cached.conn;

  if (!cached.conn) {
    cached.promise = mongoose.connect(MONGO_URL, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  console.log(`Connected to Database ${MONGO_URL}`);
};
