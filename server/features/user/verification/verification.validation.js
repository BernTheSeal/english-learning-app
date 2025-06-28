import { numericSchema } from "../../../validators/schema/numeric.schema.js";

const verifyEmail = [numericSchema("body", "token", { minLength: 6, maxLength: 6 })];

export default { verifyEmail };
