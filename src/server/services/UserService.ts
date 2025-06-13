import { hashPassword } from "@/lib/password";
import { User } from "@/models/";
import type { IUser, RegisterUserSchema } from "@/types";

export const UserService = {
  create: async ({
    password,
    ...props
  }: RegisterUserSchema): Promise<IUser> => {
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ ...props, password: hashedPassword });
    return newUser;
  },
  findByEmail: async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
  },
  findById: async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    return user;
  },
};
