import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient;

export async function getMongoDbInstance() {
  try {
    if (!uri) {
      throw new Error("Please define the MONGODB_CONNECTION_STRING");
    }

    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await client.connect();
    }

    return client;
  } finally {

    await client.close();
    
  }
}
