import { MongoClient, ObjectId } from "mongodb"; // Import MongoClient and ObjectId from mongodb package
import { comparePassword, hashPassword } from "../utils/bcrypt"; // Import hashPassword utility function from bcrypt
import { getMongoDbInstance } from "../config"; // Import getMongoDbInstance from config

const DB_NAME = process.env.MONGO_DB_NAME; // Get the database name from environment variables
const COLLECTION_NAME = "Users"; // Define the name of the collection

export type User = {

  username: string; // User's username
  email: string; // User's email
  password: string; // User's password (hashed)
  profilePicture?: string; // User's profile image URL
};

const getDB = async () => {
  const client = await getMongoDbInstance(); // Get the MongoDB client instance
  const db = client.db(DB_NAME); // Get the database from the client
  return db; // Return the database instance
};

export const getUsers = async () => {
  try {
    const db = await getDB(); // Get the database instance
    const users = await db.collection<User>(COLLECTION_NAME).find().project({ password: 0 }).toArray(); // Fetch all users excluding the password field
    return users; // Return the list of users
  } catch (error) {
    console.error("Error getting users:", error); // Log error to console
    throw new Error("Failed to get users"); // Throw an error
  }
};

export const getUserById = async (id: string | ObjectId) => {
  try {
    const db = await getDB(); // Get the database instance
    const objectId = typeof id === "string" ? new ObjectId(id) : id; // Convert id to ObjectId if it's a string
    const user = await db.collection<User>(COLLECTION_NAME).findOne({ _id: objectId }, { projection: { password: 0 } }); // Fetch the user by ID, excluding the password field
    return user; // Return the user document
  } catch (error) {
    console.error("Error getting user by ID:", error); // Log error to console
    throw new Error("Failed to get user by ID"); // Throw an error
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const db = await getDB(); // Get the database instance
    const user = await db.collection<User>(COLLECTION_NAME).findOne({ email }); // Fetch the user by ID, excluding the password field
    return user; // Return the user document
  } catch (error) {
    console.error("Error getting user by ID:", error); // Log error to console
    throw new Error("Failed to get user by ID"); // Throw an error
  }
};

export const createUser = async (newUser: User) => {
  try {
    const db = await getDB(); // Get the database instance
    newUser.password = hashPassword(newUser.password); // Hash the user's password
    const { insertedId } = await db.collection<User>(COLLECTION_NAME).insertOne(newUser); // Insert the new user into the collection
    return await getUserById(insertedId); // Retrieve the newly created user by ID
  } catch (error) {
    console.error("Error creating user:", error); // Log error to console
    throw new Error("Failed to create user"); // Throw an error
  }
};

export const verifyUserCredentials = async (email: string, password: string) => {
  try {
    const db = await getDB();
    const user = await db.collection<User>(COLLECTION_NAME).findOne({ email });

    if (user && await comparePassword(password, user.password)) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error verifying user credentials:", error);
    throw new Error("Failed to verify user credentials");
  }
};