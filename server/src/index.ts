import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB";

import { generalLimiter } from "./middlewares/rateLimiter";
import { sanitizeRequest } from "./middlewares/sanitizeRequest";
import globalErrorHandler from "./middlewares/globalErrorHandler";

import userRoutes from "./features/user/user.route";
import roleRoutes from "./features/role/role.route";
import permissionRoutes from "./features/permission/permission.route";
import userRoleRoutes from "./features/userRole/userRole.route";
import rolePermissionRoutes from "./features/rolePermission/rolePermission.route";
import sessionRoutes from "./features/session/session.route";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(sanitizeRequest);

app.use(helmet());

app.use(generalLimiter);

app.use("/api/user", userRoutes);
app.use("/api/user", userRoleRoutes);

app.use("/api/session", sessionRoutes);

app.use("/api/role", roleRoutes);
app.use("/api/role", rolePermissionRoutes);

app.use("/api/permission", permissionRoutes);

app.use(globalErrorHandler);

app.listen(port, () => {
  connectDB();
});
