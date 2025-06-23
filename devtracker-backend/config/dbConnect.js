import mongoose from "mongoose";

export const connectDatabase = () => {
  const DB_URI = process.env.DB_URI;

  mongoose
    .connect(DB_URI, { dbName: process.env.DB_COLLECTION })
    .then((con) => {
      console.log(`Mongoose Database connected with: ${con?.connection?.host}`);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};
