import { RegisterUserSchema } from '@/types';
import { UserService } from './UserService';
import { comparePassword, hashPassword } from '@/lib/password';

export const AuthService = {
  //used by nextauth
  authenticate: async (email: string, password: string) => {
    const user = await UserService.findByEmail(email);
    if (!user) {
      // //temporary until we have register page
      if (email.includes('register*')) {
        email = email.split('*')[1];
      }
      const newUser = await UserService.create({ email, password, name: email });
      return {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
      };
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
