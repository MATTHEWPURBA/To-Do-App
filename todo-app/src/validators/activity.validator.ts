import { z } from "zod"; // Import Zod for schema validation

// Define the schema for activity validation
export const actSchema = z.object({
  content: z.string().nonempty(), // content must be a non-empty string
//   authorId: z.string().nonempty(), // authorId must be a non-empty string
  imgUrl: z.string().url().optional(), // imgUrl must be a valid URL and is optional
  description: z.string().nonempty(), // description must be a non-empty string
  status: z.enum(["in progress", "completed", "won't do"]), // status must be one of the specified values
});

// Note: typeColor is not included in the schema because it is automatically derived from the status
