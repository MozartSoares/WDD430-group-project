import { hashPassword } from "@/lib/password";
import { User, waitForUserVirtuals } from "@/models/";
import type { IUser, createUserSchema } from "@/types";

export const UserService = {
  create: async ({ password, ...props }: createUserSchema): Promise<IUser> => {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ ...props, password: hashedPassword });
    return newUser;
  },
  findByEmail: async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return await waitForUserVirtuals(user);
  },
  findById: async (id: string): Promise<IUser | null> => {
    const userWithProducts = await User.findById(id).populate("products");
    return await waitForUserVirtuals(userWithProducts);
  },
  getAll: async (): Promise<IUser[] | null> => {
    return await User.find();
  },
  getById: async (id: string): Promise<IUser | null> => {
    const userWithProducts = await User.findById(id).populate("products");
    return await waitForUserVirtuals(userWithProducts);
  },

  update: async (id: string, data: Partial<IUser>) => {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    return await User.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};
