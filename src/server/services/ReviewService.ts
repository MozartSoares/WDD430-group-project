import { Review } from "@/models/Reviews";
import type { CreateReviewSchema } from "@/types";

export const ReviewService = {
  create: async (review: CreateReviewSchema) => {
    return await Review.create(review);
  },
  getAll: async () => {
    return await Review.find();
  },
  getById: async (id: string) => {
    return await Review.findById(id);
  },
  update: async (id: string, data: Partial<CreateReviewSchema>) => {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Review.findByIdAndDelete(id);
  },
};
