import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import roleRoutes from "./routes/role.route.js";
import userRoutes from "./routes/user.route.js";
import PermissionRoute from "./routes/permission.route.js";
import cors from "cors";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import { sanitizeMiddleware } from "./middlewares/sanitizeMiddleware.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(sanitizeMiddleware);

app.use(helmet());

app.use(generalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/permission", PermissionRoute);

app.use(globalErrorHandler);

app.listen(port, () => {
  connectDB();
});
