import type { IProduct, IUser } from "@/types";
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

UserModel.virtual("averageRating").get(async function (products: IProduct[]) {
  // Se já temos os produtos populados
  if (products && Array.isArray(products) && products.length > 0) {
    const productRatings = await Promise.all(
      products.map(async (product: any) => {
        // Se o produto já tem rating calculado, usa ele
        if (typeof product.rating === "number") {
          return product.rating;
        }
        // Senão, calcula o rating do produto
        const { waitForProductVirtuals } = await import("./Product");
        const productWithVirtuals = await waitForProductVirtuals(product);
        return productWithVirtuals.rating;
      }),
    );

    // Remove ratings 0 (produtos sem reviews) para não afetar a média
    const validRatings = productRatings.filter((rating) => rating > 0);

    if (validRatings.length === 0) return 0;

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    return Math.round((totalRating / validRatings.length) * 10) / 10;
  }
});

export const waitForUserVirtuals = async (user: any) => {
  const userObj = user.toObject();
  const products = await user.products;
  const averageRating = await user.averageRating;
  return {
    ...userObj,
    products,
    averageRating,
  };
};
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserModel);
