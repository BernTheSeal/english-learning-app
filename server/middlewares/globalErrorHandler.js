import statusCode from "../config/httpStatus.js";
import BaseError from "../errors/baseError.js";
import { sendErrorResponse } from "../utils/responseHelper.js";

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    console.error(err);
    return sendErrorResponse(res, err.message, err.statusCode, err.type, err.errors);
  }

  console.error(err);
  return sendErrorResponse(
    res,
    "An unexpected error occurred.",
    statusCode.INTERNAL_SERVER_ERROR,
    "application_error"
  );
};

export default globalErrorHandler;
