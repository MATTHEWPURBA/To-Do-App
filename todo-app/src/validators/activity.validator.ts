import { z } from "zod"; // Import Zod for schema validation

// Define the schema for activity validation with custom error messages
export const actSchema = z.object({
  content: z.string().nonempty({ message: "Content must be a non-empty string" }), // content must be a non-empty string with custom message
  imgUrl: z.string().nonempty({ message: "Image URL must be a non empty field" }).optional(), // imgUrl must be a valid URL and is optional with custom message
  description: z.string().nonempty({ message: "Description must be a non-empty string" }), // description must be a non-empty string with custom message
  status: z.enum(["in progress", "completed", "won't do"], {
    errorMap: () => ({ message: "Status must be one of 'in progress', 'completed', or 'won't do'" }),
  }), // status must be one of the specified values with custom message
});

// Note: typeColor is not included in the schema because it is automatically derived from the status
