import { getUsers } from "@/db/models/user";

export const GET = async () => {
  const users = await getUsers();
  return Response.json(users);
};

export const POST = async (request: Request) => {
    const body = await request.json();
    console.log(body)
    return Response.json({ message: "saya sudah dibuat",body  }, { status: 201 });
  };
  
  