import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};
