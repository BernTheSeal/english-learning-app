import { param } from "express-validator";

export const idSchema = (field = "id") => {
  return [param(field).isMongoId().withMessage("Invalid ID format!")];
};
