import mongoose from "mongoose";
import type { IProduct } from "@/types";

const ProductModel = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    description: { type: String, required: false },
    stockQuantity: { type: Number, required: true },
    materials: [
        { type: String, required: false }
    ],
    dimensions: { type: String, required: false },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductModel);
