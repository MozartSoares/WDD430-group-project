import {
  ValidateBody,
  ValidateId,
  handleControllerError,
} from "@/lib/validation";
import { CategoryService } from "@/server";
import {
  type CreateCategorySchema,
  type UpdateCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/types";

export class CategoriesController {
  static async getAll() {
    try {
      const categories = await CategoryService.getAll();
      return Response.json({ success: true, categories });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getById(id: string) {
    try {
      const category = await CategoryService.getById(id);
      if (!category) {
        return Response.json(
          { success: false, message: "Category not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, category });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateBody(createCategorySchema)
  static async create(payload: CreateCategorySchema) {
    try {
      const category = await CategoryService.create(payload);
      if (!category) {
        return Response.json(
          { success: false, message: "Category not created" },
          { status: 401 },
        );
      }
      return Response.json({
        success: true,
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  @ValidateBody(updateCategorySchema)
  static async update(id: string, payload: UpdateCategorySchema) {
    try {
      const category = await CategoryService.update(id, payload);
      if (!category) {
        return Response.json(
          { success: false, message: "Category not updated" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, category });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async delete(id: string) {
    try {
      const deleted = await CategoryService.delete(id);
      if (!deleted) {
        return Response.json(
          { success: false, message: "Category not deleted" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, message: "Category deleted" });
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
