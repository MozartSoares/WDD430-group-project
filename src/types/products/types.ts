import { Types } from 'mongoose';
import { IBase } from '../Base';

export interface IProduct extends IBase {
  name: string;
  originalPrice: number;
  currentPrice: number;
  description?: string;
  imageUrl?: string;
  userId: Types.ObjectId;
}
