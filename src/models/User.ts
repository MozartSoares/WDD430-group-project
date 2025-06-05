import mongoose from 'mongoose';
import { IUser } from '@/types';

const UserModel = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserModel);
