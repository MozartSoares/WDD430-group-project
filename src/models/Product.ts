import type { IProduct, IReview } from "@/types";
import mongoose from "mongoose";
import { waitForReviewVirtuals } from "./Review";

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
    materials: [{ type: String, required: false }],
    dimensions: { type: String, required: false },
  },
  { timestamps: true },
);

ProductModel.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  strictPopulate: false,
  foreignField: "_id",
  justOne: true,
});

ProductModel.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  strictPopulate: false,
  justOne: false,
});

ProductModel.virtual("rating").get(async function () {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (sum: number, review: IReview) => sum + review.rating,
      0,
    );
    return Math.round((totalRating / this.reviews.length) * 10) / 10;
  }

  const Review = mongoose.model("Review");
  const reviews = await Review.find({ productId: this._id });

  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce(
    (sum: number, review: IReview) => sum + review.rating,
    0,
  );
  return Math.round((totalRating / reviews.length) * 10) / 10;
});

ProductModel.virtual("reviewCount").get(async function () {
  if (this.reviews && Array.isArray(this.reviews)) {
    return this.reviews.length;
  }

  const Review = mongoose.model("Review");
  const count = await Review.countDocuments({ productId: this._id });
  return count;
});

ProductModel.virtual("isNew").get(async function () {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
});

export const waitForProductVirtuals = async (product: any) => {
  const productObj = product.toObject();
  const [rating, reviewCount, isNew, category, reviews] = await Promise.all([
    product.rating,
    product.reviewCount,
    product.isNew,
    product.category,
    product.reviews,
  ]);
  const reviewsWithUser = await Promise.all(
    reviews.map(async (review: IReview) => {
      return await waitForReviewVirtuals(review);
    }),
  );

  return {
    ...productObj,
    rating,
    reviewCount,
    isNew,
    category,
    reviews: reviewsWithUser,
  };
};

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductModel);
