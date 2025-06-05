import mongoose from 'mongoose';
import { IProduct } from '@/types';

const ProductModel = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductModel);
