import mongoose from 'mongoose';
import type { IProduct } from '@/types';

const ProductModel = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductModel);
