import type { Types } from "mongoose";
import type { IBase } from "../Base";
import type { ICategory } from "../categories/types";
import type { IReview } from "../reviews/types";

export interface IProduct extends IBase {
  name: string;
  originalPrice: number;
  currentPrice: number;
  description?: string;
  imageUrl?: string;
  userId: Types.ObjectId;
  categoryId?: Types.ObjectId;
  stockQuantity: number;
  materials?: string[];
  dimensions?: string;

  //virtuals
  isNew?: boolean;
  reviews?: IReview[];
  rating?: number;
  reviewCount?: number;
  category?: ICategory;
}
