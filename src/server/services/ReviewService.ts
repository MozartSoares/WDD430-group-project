import { Review, waitForReviewVirtuals } from "@/models/Review";
import type { CreateReviewSchema } from "@/types";

export const ReviewService = {
  create: async (review: CreateReviewSchema) => {
    await Review.create(review);
    return await waitForReviewVirtuals(review);
  },
  getAll: async () => {
    const reviews = await Review.find();
    const reviewsWithVirtuals = await Promise.all(
      reviews.map(async (review) => {
        return await waitForReviewVirtuals(review);
      }),
    );
    return reviewsWithVirtuals;
  },
  getById: async (id: string) => {
    const review = await Review.findById(id);
    return await waitForReviewVirtuals(review);
  },
  getByProductId: async (id: string) => {
    const reviews = await Review.find({ productId: id });
    const reviewsWithVirtuals = await Promise.all(
      reviews.map(async (review) => {
        return await waitForReviewVirtuals(review);
      }),
    );
    return reviewsWithVirtuals;
  },
  getByUserId: async (id: string) => {
    const reviews = await Review.find({ userId: id });
    const reviewsWithVirtuals = await Promise.all(
      reviews.map(async (review) => {
        return await waitForReviewVirtuals(review);
      }),
    );
    return reviewsWithVirtuals;
  },
  update: async (id: string, data: Partial<CreateReviewSchema>) => {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Review.findByIdAndDelete(id);
  },
};
