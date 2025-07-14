import { HTTP_SUCCESS_STATUS, HTTP_ERROR_STATUS } from "../config/httpStatus";

export type SuccessStatusCode = (typeof HTTP_SUCCESS_STATUS)[keyof typeof HTTP_SUCCESS_STATUS];
export type ErrorStatusCode = (typeof HTTP_ERROR_STATUS)[keyof typeof HTTP_ERROR_STATUS];
