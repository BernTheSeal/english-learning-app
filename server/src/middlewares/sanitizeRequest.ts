import { Request, Response, NextFunction } from "express";
import xss from "xss";

export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  const fields = ["body", "query", "params"] as const;

  fields.forEach((key) => {
    if (req[key]) {
      sanitizeRecursive(req[key]);
    }
  });

  next();
};

function sanitizeRecursive(obj: any) {
  if (typeof obj === "string") {
    return xss(obj);
  }

  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = sanitizeRecursive(obj[key]);
    }
  }

  return obj;
}
