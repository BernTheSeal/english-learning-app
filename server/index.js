import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

import { generalLimiter } from "./middlewares/rateLimiter.js";
import { sanitizeMiddleware } from "./middlewares/sanitizeMiddleware.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

import authRoutes from "./features/auth/index.route.js";
import userRoutes from "./features/user/user.route.js";
import roleRoutes from "./features/role/role.route.js";
import permissionRoutes from "./features/permission/permission.route.js";
import userRoleRoutes from "./features/userRole/userRole.route.js";
import rolePermissionRoutes from "./features/rolePermission/rolePermission.route.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(sanitizeMiddleware);

app.use(helmet());

app.use(generalLimiter);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/user", userRoleRoutes);

app.use("/api/role", roleRoutes);
app.use("/api/role", rolePermissionRoutes);

app.use("/api/permission", permissionRoutes);

app.use(globalErrorHandler);

app.listen(port, () => {
  connectDB();
});
