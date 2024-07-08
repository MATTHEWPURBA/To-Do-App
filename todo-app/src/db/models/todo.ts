import { ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config"; // Import the MongoDB connection function

const DB_NAME = process.env.MONGO_DB_NAME; // Get the database name from environment variables
const COLLECTION_NAME = "Activity"; // Define the name of the collection

// Define the Activity type
export type Activity = {
  content: string;
  authorId: string;
  imgUrl?: string; // Make imgUrl optional
  typeColor: string; // typeColor is required in Activity type
  createdAt: string;
  updatedAt: string;
  description: string;
  status: "in progress" | "completed" | "won't do"; // Restrict status values
};

// Define the ActivityInput type for client input
export type ActivityInput = {
  content: string;
  authorId: string;
  imgUrl?: string; // Make imgUrl optional
  description: string;
  status: "in progress" | "completed" | "won't do"; // Restrict status values
};
// Function to get the database instance
const getDB = async () => {
  const client = await getMongoDbInstance(); // Get the MongoDB client instance
  const db = client.db(DB_NAME); // Get the database from the client
  return db; // Return the database instance
};

// Function to get all activities from the collection
export const getActivities = async () => {
  try {
    const db = await getDB();
    const activities = await db.collection<Activity>(COLLECTION_NAME).find().toArray();
    return activities;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Activities");
  }
};

// Helper function to get the type color based on activity status
const getTypeColor = (status: Activity["status"]) => {
  switch (status) {
    case "in progress":
      return "yellow"; // Return yellow for 'in progress'
    case "completed":
      return "green"; // Return green for 'completed'
    case "won't do":
      return "red"; // Return red for 'won't do'
    default:
      return "gray"; // Default color if status is not recognized
  }
};

export const getActivityById = async (id: string | ObjectId) => {
  try {
    const db = await getDB(); // Get the database instance
    const objectId = typeof id === "string" ? new ObjectId(id) : id; // Convert id to ObjectId if it's a string
    const activity = await db.collection<Activity>(COLLECTION_NAME).findOne({ _id: objectId }, { projection: { password: 0 } }); // Fetch the activity by ID, excluding the password field
    return activity; // Return the user document
  } catch (error) {
    console.error("Error getting user by ID:", error); // Log error to console
    throw new Error("Failed to get user by ID"); // Throw an error
  }
};

// Function to create a new activity
export const createActivity = async (newAct: ActivityInput) => {
  try {
    const db = await getDB();
    const { insertedId } = await db.collection<Activity>(COLLECTION_NAME).insertOne({
      ...newAct,
      typeColor: getTypeColor(newAct.status), // Set typeColor based on status
      createdAt: new Date().toISOString(), // Set createdAt to current date
      updatedAt: new Date().toISOString(), // Set updatedAt to current date
    });

    return await getActivityById(insertedId);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Activity");
  }
};
