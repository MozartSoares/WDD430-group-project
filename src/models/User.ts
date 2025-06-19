import type { IUser } from "@/types";
import mongoose from "mongoose";

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

UserModel.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserModel);
