import { deleteActivity, getActivityById, updateActivity } from "@/db/models/todo";
import { verifyToken } from "@/db/utils/jwt";
import { actSchema } from "@/validators/activity.validator";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export type GetActDetailParam = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: GetActDetailParam) => {
  try {
    const { id } = params; // Get the activity ID from the URL
    const activity = await getActivityById(new ObjectId(id));
    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }
    return NextResponse.json({ activity }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get activity" }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: GetActDetailParam) => {
  try {
    const { id } = params;
    const body = await request.json();
    const parseBody = actSchema.parse(body);

    // Get authorId from decoded token
    const token = request.cookies.get("accessToken");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = verifyToken(token.value);
    if (typeof decodedToken === "string" || !decodedToken._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const authorId = decodedToken._id;

    const updatedAct = await updateActivity({ ...parseBody, id: new ObjectId(id), authorId });
    return NextResponse.json({ updatedAct }, { status: 200 }); // Return updated activity with status 200
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      // Check if the error is a Zod validation error
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 }); // Return validation error message with status 400
    } else {
      // For other errors
      return NextResponse.json({ error: "Failed to update activity" }, { status: 500 }); // Return generic error message with status 500
    }
  }
};

export const DELETE = async (request: Request, { params }: GetActDetailParam) => {
  try {
    const { id } = params; // Get the activity ID from the URL
    await deleteActivity(new ObjectId(id));
    return new Response(JSON.stringify({ message: "Activity deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete activity" }), { status: 500 });
  }
};
