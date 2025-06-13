import { ValidateBody, handleControllerError } from "@/lib/validation";
import { type CreateUserSchema, createUserSchema } from "@/types";
import { AuthService } from "../services";


export class AuthController {
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

  @ValidateBody(createUserSchema)
  static async register(payload: CreateUserSchema) {
    try {
      const user = await AuthService.register(payload);

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
  }
}
