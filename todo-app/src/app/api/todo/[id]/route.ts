import { deleteActivity, getActivityById, updateActivity } from "@/db/models/todo";
import { verifyToken } from "@/db/utils/jwt";
import { actSchema } from "@/validators/activity.validator";
import { createServer } from "http";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";
import { z } from "zod";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend origin
    methods: ["GET", "POST"],
  },
});

const broadcastUpdate = (event: string, data: any) => {
  io.emit(event, data);
};

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
    // console.log(body, 'Received payload:'); // Log the received payload
    const parseBody = actSchema.parse(body);

    const headerList = headers();
    const userId = headerList.get("userId");
    const authorId = new ObjectId(userId as string);

    const updatedAct = await updateActivity({ ...parseBody, id: new ObjectId(id), authorId: authorId.toString() });

    // Notify Socket.IO clients about the update
    broadcastUpdate("activityUpdated", updatedAct);
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
    // Notify Socket.IO clients about the deletion
    broadcastUpdate("activityDeleted", id);

    return new Response(JSON.stringify({ message: "Activity deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete activity" }), { status: 500 });
  }
};
