import { Product } from "@/models/Product";
import type { CreateProductSchema } from "@/types";

export const ProductService = {
  create: async (product: CreateProductSchema) => {
    return await Product.create(product);
  },
  getAll: async () => {
    return await Product.find();
  },
  getById: async (id: string) => {
    return await Product.findById(id);
  },
  update: async (id: string, data: Partial<CreateProductSchema>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },
};
