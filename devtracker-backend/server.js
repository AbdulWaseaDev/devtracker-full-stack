import express from "express";
import errorsMiddleware from "./middlewares/errors.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import cors from "cors";

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down the Server due to UncaughtException");
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });
const app = express();

//Database connection
connectDatabase();

// 1-Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

import authRoutes from "./routes/authRoutes.js";
import devtoRoutes from "./routes/devtoRoutes.js";

//use routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/devto", devtoRoutes);

//use Error Middlewares
app.use(errorsMiddleware);

//server starting
const server = app.listen(process.env.PORT, () =>
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
  ),
);

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down the Server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

// npx prettier --write .
