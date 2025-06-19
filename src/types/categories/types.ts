import type { IBase } from "../Base";
import type { IProduct } from "../products";

export interface ICategory extends IBase {
  name: string;
  description?: string;
  imageUrl: string;

  //virtuals
  products: IProduct[];
}
