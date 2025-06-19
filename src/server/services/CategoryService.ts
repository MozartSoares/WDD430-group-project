import { Category, waitForCategoryVirtuals } from "@/models/Category";
import type { CreateCategorySchema } from "@/types";

export const CategoryService = {
  create: async (category: CreateCategorySchema) => {
    return await Category.create(category);
  },
  getAll: async () => {
    const categories = await Category.find();
    const categoriesWithVirtuals = await Promise.all(
      categories.map(async (category) => {
        return await waitForCategoryVirtuals(category);
      }),
    );
    return categoriesWithVirtuals;
  },
  getById: async (id: string) => {
    const category = await Category.findById(id);
    return await waitForCategoryVirtuals(category);
  },
  update: async (id: string, data: Partial<CreateCategorySchema>) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Category.findByIdAndDelete(id);
  },
};
