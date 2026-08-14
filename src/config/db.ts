import mongoose from 'mongoose';
import dns from 'dns';

// Configure fallback DNS servers to resolve local/cloud connection issues
dns.setServers(['8.8.8.8', '1.1.1.1']);


export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};