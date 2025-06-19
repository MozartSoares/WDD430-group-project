import { Review } from "@/models/Review";
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
  getByProductId: async (id: string) => {
    return await Review.find({productId: id});
  },
  getByUserId: async (id: string) => {
    return await Review.find({userId: id});
  },
  update: async (id: string, data: Partial<CreateReviewSchema>) => {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Review.findByIdAndDelete(id);
  },
};
