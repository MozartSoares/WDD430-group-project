import { handleControllerError, ValidateBody, ValidateId } from '@/lib/validation';
import { updateUserSchema, UpdateUserSchema } from '@/types/user/schemas';
import { UserService } from '@/server';

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
        return Response.json({ success: false, message: 'User not found' }, { status: 404 });
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
        return Response.json({ success: false, message: 'User not updated' }, { status: 404 });
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
        return Response.json({ success: false, message: 'User not deleted' }, { status: 404 });
      }
      return Response.json({ success: true, message: 'User deleted' });
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
