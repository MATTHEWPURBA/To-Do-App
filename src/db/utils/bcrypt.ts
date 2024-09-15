import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
