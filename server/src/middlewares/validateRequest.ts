import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import ValidationError from "../errors/validationError";
import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import { zodEmptyObject } from "../shared/zod";

type ZodRequestSchemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export const validateRequest = (schemas: ZodRequestSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodySchema = schemas.body || zodEmptyObject;
      const querySchema = schemas.query || zodEmptyObject;
      const paramsSchema = schemas.params || zodEmptyObject;

      const resultBody = await bodySchema.safeParseAsync(req.body);
      if (!resultBody.success) {
        throw new ValidationError(
          "validation error",
          HTTP_ERROR_STATUS.BAD_REQUEST,
          resultBody.error.issues
        );
      }

      const resultQuery = await querySchema.safeParseAsync(req.query);
      if (!resultQuery.success) {
        throw new ValidationError(
          "validation error",
          HTTP_ERROR_STATUS.BAD_REQUEST,
          resultQuery.error.issues
        );
      }

      const resultParams = await paramsSchema.safeParseAsync(req.params);
      if (!resultParams.success) {
        throw new ValidationError(
          "validation error",
          HTTP_ERROR_STATUS.BAD_REQUEST,
          resultParams.error.issues
        );
      }

      req.validatedParams = resultParams.data;
      req.validatedQuery = resultQuery.data;
      req.validatedBody = resultBody.data;

      next();
    } catch (err) {
      next(err);
    }
  };
};
