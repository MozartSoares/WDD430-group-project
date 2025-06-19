import type { Types } from "mongoose";
import type { IBase } from "../Base";
import type { IProduct } from "../products";
import type { IUser } from "../user/types";

export interface IReview extends IBase {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment?: string;

  //virtuals
  product?: IProduct;
  user?: IUser;
}
