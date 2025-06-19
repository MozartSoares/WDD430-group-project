import {
  ValidateBody,
  ValidateId,
  handleControllerError,
} from "@/lib/validation";
import { UserService } from "@/server";
import { type UpdateUserSchema, updateUserSchema } from "@/types/user/schemas";

export class UserController {
  static async getAll() {
    try {
      const users = await UserService.getAll();
      return Response.json({ success: true, users });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getById(id: string) {
    try {
      const user = await UserService.getById(id);
      if (!user) {
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, user });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  static async getByEmail(email: string) {
    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        return Response.json(
          { success: false, message: "User not by that email found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, user });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  @ValidateBody(updateUserSchema)
  static async update(id: string, payload: UpdateUserSchema) {
    try {
      const user = await UserService.update(id, payload);
      if (!user) {
        return Response.json(
          { success: false, message: "User not updated" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, user });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async delete(id: string) {
    try {
      const deleted = await UserService.delete(id);
      if (!deleted) {
        return Response.json(
          { success: false, message: "User not deleted" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, message: "User deleted" });
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
