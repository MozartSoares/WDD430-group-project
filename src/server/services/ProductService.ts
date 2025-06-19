import { Product, waitForProductVirtuals } from "@/models/Product";
import type { CreateProductSchema } from "@/types";

export const ProductService = {
  create: async (product: CreateProductSchema) => {
    return await Product.create(product);
  },
  getAll: async () => {
    const products = await Product.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("category");

    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        return await waitForProductVirtuals(product);
      }),
    );

    return productsWithRating;
  },
  getById: async (id: string) => {
    const product = await Product.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("category");
    return await waitForProductVirtuals(product);
  },
  getByCategoryId: async (id: string) => {
    const products = await Product.find({ categoryId: id })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("category");
    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        return await waitForProductVirtuals(product);
      }),
    );
    return productsWithRating;
  },
  getByUserId: async (id: string) => {
    const products = await Product.find({ userId: id })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("category");
    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        return await waitForProductVirtuals(product);
      }),
    );
    return productsWithRating;
  },
  update: async (id: string, data: Partial<CreateProductSchema>) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },
};
