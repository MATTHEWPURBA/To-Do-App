import { get } from "http";
import { getMongoDbInstance } from "../config";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = "Users";

export type User = {
  username: string;
  email: string;
  password: string;
  profileimage: string;
};

export const getDB = async () => {
  const client = await getMongoDbInstance();
  const db = client.db(DB_NAME);
  return db;
};

export const getUsers = async () => {
  const db = await getDB();
  return await db.collection<User>(COLLECTION_NAME).find().project({ password: 0 } /** untuk hide password */).toArray();
};

export const getUserById = async (id: string) => {
  const db = await getDB();
  return await db.collection<User>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
};

export const createUser = async (newUser: User) => {
  const db = await getDB();
  newUser.password 
  return await db.collection<User>(COLLECTION_NAME).insertOne(newUser);
};
