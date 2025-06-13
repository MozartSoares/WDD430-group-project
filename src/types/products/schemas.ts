import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  price: z.number().min(0, "Price must be greater than 0"),
  description: z.string().optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
