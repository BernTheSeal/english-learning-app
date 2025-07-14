import crypto from "crypto";

export const generateResetPasswordToken = (): {
  token: string;
  expiresAt: Date;
  type: "RESET_PASSWORD";
} => {
  const token = crypto.randomBytes(20).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const type = "RESET_PASSWORD";
  return { token, expiresAt, type };
};
