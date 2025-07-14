import bcrypt from "bcryptjs";

const SALT_ROUNDS: number = 10;
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};
