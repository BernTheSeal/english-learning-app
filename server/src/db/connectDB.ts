import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "english-learning-app",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Server is running successfully and connected to the database!");
  } catch (error) {
    process.exit(1);
  }
};
