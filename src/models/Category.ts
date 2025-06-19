import type { ICategory } from "@/types/categories/types";
import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

CategoryModel.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryId",
  strictPopulate: false,
  justOne: false,
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategoryModel);
