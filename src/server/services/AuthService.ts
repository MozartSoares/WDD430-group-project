import { RegisterUserSchema } from '@/types';
import { UserService } from './UserService';
import { comparePassword, hashPassword } from '@/lib/password';

export const AuthService = {
  //used by nextauth
  authenticate: async (email: string, password: string) => {
    const user = await UserService.findByEmail(email);
    if (!user) {
      // //temporary for testing
      // const name = 'test' + Math.random().toString(36).substring(2, 15);
      // console.log('creating user', email, password, name);
      // return UserService.create({ email, password, name });
      return null;
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  },
  register: async ({ email, password, name }: RegisterUserSchema) => {
    const user = await UserService.findByEmail(email);
    if (user) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);
    const newUser = await UserService.create({ email, password: hashedPassword, name });
    return {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
    };
  },
};
