import mongoose from "mongoose";
import type { ICategory } from "@/types/categories/types";

const CategoryModel = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategoryModel);
