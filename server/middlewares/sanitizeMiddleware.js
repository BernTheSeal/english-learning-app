import { sanitize } from "express-mongo-sanitize";

export const sanitizeMiddleware = (req, res, next) => {
  ["query", "body", "params"].forEach((key) => {
    if (req[key]) {
      const sanitizedData = sanitize(req[key]);
      Object.keys(sanitizedData).forEach((k) => {
        req[key][k] = sanitizedData[k];
      });
    }
  });
  next();
};
