export const generateVerifyEmailToken = () => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 60 * 60 * 1000 * 24;
  const type = "VERIFY_EMAIL";
  return { token, expiresAt, type };
};
