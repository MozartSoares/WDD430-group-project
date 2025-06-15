import mongoose from "mongoose";
import type { IUser } from "@/types";

const UserModel = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: { type: String, required: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserModel);
