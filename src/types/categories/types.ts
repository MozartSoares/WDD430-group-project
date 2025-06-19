import type { IBase } from "../Base";

export interface ICategory extends IBase {
  name: string;
  description?: string;
  imageUrl: string;
}
