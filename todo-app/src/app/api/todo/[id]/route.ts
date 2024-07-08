import { getActivityById } from "@/db/models/todo";
import { NextRequest } from "next/server";

export type GetActDetailParam = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, cfx: GetActDetailParam) => {
  console.log(request.nextUrl.searchParams.get("search"), "ini buat search");
  // ini untuk fitur search by username dengan (?search=macan)
  const activity = await getActivityById(cfx.params.id); // ini untuk search by id
  //   console.log(panci,'ini panci')
  return Response.json(activity);
};
