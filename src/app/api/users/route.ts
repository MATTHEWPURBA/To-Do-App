import { getUsers } from "@/db/models/user";

export const GET = async () => {
  try {
    const users = await getUsers();
    return Response.json({ users }, { status: 200 }); // Using status code 200 for success
  } catch (error) {
    return Response.json({ error }, { status: 500 }); // Internal server error status code
  }
};
