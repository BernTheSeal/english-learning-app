import { HTTP_ERROR_STATUS } from "../config/httpStatus";
import ValidationError from "../errors/validationError";
import { Request, Response, NextFunction } from "express";

type allowedFieldsType = {
  [key: string]: "body" | "params" | "query";
};

export const whitelistFields =
  (allowedFields: allowedFieldsType) => (req: Request, res: Response, next: NextFunction) => {
    const field = ["body", "params", "query"] as const;
    try {
      for (const type of field) {
        const data = req[type] || {};

        for (const field of Object.keys(data)) {
          const allowedSource = allowedFields[field];

          if (!allowedSource) {
            throw new ValidationError(`Field "${field}" is not allowed`, HTTP_ERROR_STATUS.BAD_REQUEST);
          }

          if (allowedSource !== type) {
            throw new ValidationError(
              `Field "${field}" is only allowed in ${allowedSource}, but was found in ${type}`,
              HTTP_ERROR_STATUS.BAD_REQUEST
            );
          }
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
