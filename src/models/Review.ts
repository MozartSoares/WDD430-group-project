import type { IReview } from "@/types/reviews/types";
import mongoose from "mongoose";

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
  { timestamps: true },
);

ReviewModel.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

ReviewModel.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const waitForReviewVirtuals = async (
  review: any,
  excludeProduct = false,
) => {
  const reviewObj = review.toObject();
  const [product, user] = await Promise.all([review.product, review.user]);
  return {
    ...reviewObj,
    product: excludeProduct ? undefined : product,
    user,
  };
};

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewModel);
