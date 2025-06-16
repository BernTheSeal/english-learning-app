import { numericSchema } from "../../../validators/schema/numeric.schema.js";

const verifyCode = [numericSchema("body", "code", { minLength: 6, maxLength: 6 })];

export default { verifyCode };
