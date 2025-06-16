import { Category } from "@/models/Category";
import type { CreateCategorySchema } from "@/types";

export const CategoryService = {
  create: async (category: CreateCategorySchema) => {
    return await Category.create(category);
  },
  getAll: async () => {
    return await Category.find();
  },
  getById: async (id: string) => {
    return await Category.findById(id);
  },
  update: async (id: string, data: Partial<CreateCategorySchema>) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Category.findByIdAndDelete(id);
  },
};
