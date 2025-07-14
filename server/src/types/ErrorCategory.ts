import { ERROR_CATEGORY } from "../config/errorCategory";

export type ErrorCategory = (typeof ERROR_CATEGORY)[keyof typeof ERROR_CATEGORY];
