// import { createActivity, getActivities } from "@/db/models/activity"; // Import model functions
import { createActivity, deleteActivity, getActivities, getActivitiesByUser, updateActivity } from "@/db/models/todo";
import { verifyToken } from "@/db/utils/jwt";
import { actSchema } from "@/validators/activity.validator"; // Import the activity validation schema
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Handler for GET requests to fetch all activities
export const GET = async () => {
  try {
    const headerList = headers();
    const userId = headerList.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const authorId = new ObjectId(userId as string);
    const activities = await getActivitiesByUser(authorId.toString());
    return Response.json({ activities }, { status: 200 }); // Return activities with status 200
  } catch (error) {
    return Response.json({ error }, { status: 500 }); // Return error with status 500
  }
};

// Handler for POST requests to create a new activity
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json(); // Parse request body
    const parsedBody = actSchema.parse(body); // Validate and parse body using actSchema

    const headerList = headers();
    const userId = headerList.get("userId");
    const authorId = new ObjectId(userId as string);
    const createdAct = await createActivity({ ...parsedBody, authorId: authorId.toString() });

    return Response.json({ createdAct }, { status: 201 }); // Return created activity ID with status 201
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ message: error.issues[0].message }, { status: 400 }); // Bad request status for validation errors
    } else {
      return Response.json({ error: "Failed to create " }, { status: 500 }); // Internal server error for other errors
    }
  }
};
