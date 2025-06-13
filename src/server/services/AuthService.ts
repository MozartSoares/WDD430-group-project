
import { comparePassword, hashPassword } from "@/lib/password";
import type { createUserSchema } from "@/types";
import { UserService } from "./UserService";

export class AuthService {
  //used by nextauth
  static async authenticate(email: string, password: string) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      // //temporary until we have register page
      if (email.includes("register*")) {
        const newEmail = email.split("*")[1];
        const newUser = await UserService.create({
          email: newEmail,
          password,
          name: newEmail,
        });
        return {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
        };
      }
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
  }

  static async register({ email, password, name }: createUserSchema) {
    const user = await UserService.findByEmail(email);
    if (user) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await UserService.create({
      email,
      password: hashedPassword,
      name,
    });
    return {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
    };
  }
}
