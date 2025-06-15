import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  biography: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  biography: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type createUserSchema = z.infer<typeof createUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
