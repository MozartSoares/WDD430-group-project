import type { NextRequest } from "next/server";
import { AuthService } from "../services";
import { registerUserSchema } from "@/types";
import { handleControllerError, validateBody } from "@/lib/validation";

export const AuthController = {
  //probably we wont need this because nextauth will handle the login and register using the service directly
  //but we can keep it here commented for now
  // login: async (req: NextRequest) => {
  //   try {
  //     const body = await req.json();

  //     const { email, password } = validateBody(loginUserSchema, body);

  //     const user = await AuthService.authenticate(email, password);

  //     if (!user) {
  //       return Response.json(
  //         {
  //           success: false,
  //           message: 'Invalid email or password',
  //         },
  //         { status: 401 }
  //       );
  //     }

  //     return Response.json({
  //       success: true,
  //       message: 'Login successful',
  //       user,
  //     });
  //   } catch (error: unknown) {
  //     return handleControllerError(error);
  //   }
  // },

  register: async (req: NextRequest) => {
    try {
      const body = await req.json();
      const { name, email, password } = validateBody(registerUserSchema, body);

      const user = await AuthService.register({ name, email, password });

      return Response.json(
        {
          success: true,
          message: "User created successfully",
          user,
        },
        { status: 201 },
      );
    } catch (error) {
      return handleControllerError(error);
    }
  },
};
