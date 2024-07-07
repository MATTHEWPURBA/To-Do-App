import { createUser, getUsers } from "@/db/models/user";
import { userSchema } from "@/validators/user.validator";
import { z } from "zod";

export const GET = async () => {
  try {
    const users = await getUsers();
    return Response.json({ users }, { status: 200 }); // Using status code 200 for success
  } catch (error) {
    return Response.json({ error }, { status: 500 }); // Internal server error status code
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const parsedBody = userSchema.parse(body);
    // console.log(parsedBody,"ini parsedBody  ")
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
