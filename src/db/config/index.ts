import { MongoClient, ServerApiVersion } from "mongodb"; // Import MongoDB client and server API version

const uri = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

let client: MongoClient | null = null; // Initialize client variable as null

export async function getMongoDbInstance(): Promise<MongoClient> {
  // Define async function to get MongoDB client
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable."); // Throw error if URI is not defined
  }

  if (!client) {
    // Check if client is not initialized
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1, // Specify server API version
        strict: true, // Enable strict mode
        deprecationErrors: true, // Enable deprecation errors
      },
    });

    try {
      await client.connect(); // Attempt to connect to MongoDB
      console.log("MongoDB connected successfully"); // Log success message
    } catch (error) {
      console.error("Failed to connect to MongoDB", error); // Log error message
      client = null; // Reset client to null on error
      throw error; // Re-throw the error
    }
  }

  return client; // Return the MongoDB client instance
}

// Example usage
async function someDatabaseOperation() {
  const client = await getMongoDbInstance(); // Get the MongoDB client instance
  const db = client.db("yourDatabaseName"); // Get a reference to the specific database
  const collection = db.collection("yourCollectionName"); // Get a reference to the specific collection

  // Perform your database operations here
}
