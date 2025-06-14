import type { Types } from "mongoose";
import type { IBase } from "../Base";

export interface IReview extends IBase {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
}
