import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Base64 image validation
const imageSchema = z
  .string()
  .refine((value) => {
    // Allow URLs or base64 data URIs
    return value.startsWith("http") || value.startsWith("data:image/");
  }, "Invalid image format. Must be a URL or base64 image data.")
  .optional();

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  biography: z.string().optional(),
  imageUrl: imageSchema,
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  biography: z.string().optional(),
  imageUrl: imageSchema,
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type createUserSchema = z.infer<typeof createUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
