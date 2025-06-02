import { handleValidation } from "../middlewares/handleValidation.js";

export const withValidation = (fields) => {
  const validators = Array.isArray(fields) ? fields : [fields];
  return [...validators, handleValidation];
};
