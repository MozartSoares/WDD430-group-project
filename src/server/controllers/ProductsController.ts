import {
  ValidateBody,
  ValidateId,
  handleControllerError,
} from "@/lib/validation";
import { ProductService } from "@/server";
import {
  type CreateProductSchema,
  type UpdateProductSchema,
  createProductSchema,
  updateProductSchema,
} from "@/types";

export class ProductsController {
  static async getAll() {
    try {
      const products = await ProductService.getAll();
      return Response.json({ success: true, products });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getById(id: string) {
    try {
      const product = await ProductService.getById(id);
      if (!product) {
        return Response.json(
          { success: false, message: "Product not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, product });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateBody(createProductSchema)
  static async create(payload: CreateProductSchema) {
    try {
      const product = await ProductService.create(payload);
      if (!product) {
        return Response.json(
          { success: false, message: "Product not created" },
          { status: 401 },
        );
      }
      return Response.json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  @ValidateBody(updateProductSchema)
  static async update(id: string, payload: UpdateProductSchema) {
    try {
      const product = await ProductService.update(id, payload);
      if (!product) {
        return Response.json(
          { success: false, message: "Product not updated" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, product });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async delete(id: string) {
    try {
      const deleted = await ProductService.delete(id);
      if (!deleted) {
        return Response.json(
          { success: false, message: "Product not deleted" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, message: "Product deleted" });
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
