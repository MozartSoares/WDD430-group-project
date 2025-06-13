import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  originalPrice: z.number().min(0, "Original price must be greater than 0"),
  currentPrice: z.number().min(0, "Current price must be greater than 0"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  userId: z.string().min(1, "User ID is required"),
});

export const updateProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  originalPrice: z
    .number()
    .min(0, "Original price must be greater than 0")
    .optional(),
  currentPrice: z
    .number()
    .min(0, "Current price must be greater than 0")
    .optional(),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  userId: z.string().min(1, "User ID is required").optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
