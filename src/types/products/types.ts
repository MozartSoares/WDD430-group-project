import { IBase } from '../Base';

export interface IProduct extends IBase {
  name: string;
  price: number;
  description?: string;
}
