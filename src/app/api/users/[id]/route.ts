import { getUserById, getUsers } from "@/db/models/user";
import { NextRequest } from "next/server";

export type GetUserDetailParam = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, cfx: GetUserDetailParam) => {
  console.log(request.nextUrl.searchParams.get("search"), "ini buat search");
  // ini untuk fitur search by username dengan (?search=macan)
  const user = await getUserById(cfx.params.id); // ini untuk search by id
  //   console.log(panci,'ini panci')
  return Response.json(user);
};

