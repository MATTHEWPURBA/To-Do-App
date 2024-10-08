import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profilePicture: z.string().url("Invalid URL").optional(), // optional harus bikin type User jadi ada profilePicture?
});
