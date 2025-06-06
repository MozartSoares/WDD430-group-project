import { User } from '@/models/';
import { IUser, RegisterUserSchema } from '@/types';

export const UserService = {
  create: async (user: RegisterUserSchema): Promise<IUser> => {
    console.log('user', user);
    const newUser = await User.create(user);
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
