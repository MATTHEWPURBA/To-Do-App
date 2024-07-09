import jwt from "jsonwebtoken";

const rahasia = process.env.JWT_SECRET as string;

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, rahasia);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
