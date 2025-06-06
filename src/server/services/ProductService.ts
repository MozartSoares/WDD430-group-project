import { Product } from '@/models/Product';
import { CreateProductSchema } from '@/types';

export const ProductService = {
  create: async (product: CreateProductSchema) => {
    return await Product.create(product);
  },
};
