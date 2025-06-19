import mongoose from "mongoose";
import type { IReview } from "@/types/reviews/types";

const ReviewModel = new mongoose.Schema<IReview>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewModel);
