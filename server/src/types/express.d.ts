import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      fullAccess?: boolean;

      validatedBody: unknown;
      validatedQuery: unknown;
      validatedParams: unknown;
    }
  }
}
