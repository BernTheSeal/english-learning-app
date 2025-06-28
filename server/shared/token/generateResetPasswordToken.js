import crypto from "crypto";

export const generateResetPasswordToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expiresAt = Date.now() + 1 * 60 * 60 * 500;
  const type = "RESET_PASSWORD";
  return { token, expiresAt, type };
};
