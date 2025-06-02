import HTTP_STATUS from "../config/httpStatus.js";
import ValidationError from "../errors/validationError.js";

export const whitelistFields = (allowed) => (req, res, next) => {
  try {
    for (const type of ["body", "params", "query"]) {
      const data = req[type] || {};

      for (const field of Object.keys(data)) {
        const allowedSource = allowed[field];

        if (!allowedSource) {
          throw new ValidationError(
            `Field "${field}" is not allowed`,
            HTTP_STATUS.BAD_REQUEST
          );
        }

        if (allowedSource !== type) {
          throw new ValidationError(
            `Field "${field}" is only allowed in ${allowedSource}, but was found in ${type}`,
            HTTP_STATUS.BAD_REQUEST
          );
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
