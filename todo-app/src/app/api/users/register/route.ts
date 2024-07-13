import { createUser } from "@/db/models/user";
import { userSchema } from "@/validators/user.validator";
import { z } from "zod";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsedBody = userSchema.parse(body);
    const createdUser = await createUser(parsedBody);
    return Response.json({ createdUser }, { status: 201 }); // Created status code for successful creation
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ message: error.issues[0].message }, { status: 400 }); // Bad request status for validation errors
    } else {
      return Response.json({ error: "Failed to create user" }, { status: 500 }); // Internal server error for other errors
    }
  }
};
