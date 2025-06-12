import { handleControllerError, validateBody } from "@/lib/validation";
import { createProductSchema } from "@/types";
import type { NextRequest } from "next/server";
import { ProductService } from "@/server";

export const ProductsController = {
  create: async (req: NextRequest) => {
    try {
      const body = await req.json();

      const { name, price, description } = validateBody(
        createProductSchema,
        body,
      );

      const product = await ProductService.create({ name, price, description });

      if (!product) {
        return Response.json(
          {
            success: false,
            message: "Product not created",
          },
          { status: 401 },
        );
      }

      return Response.json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error: unknown) {
      return handleControllerError(error);
    }
  },
  // get: async (req: NextRequest) => {
  //   return await ProductsService.get(req);
  // },
  // update: async (req: NextRequest) => {
  //   return await ProductsService.update(req);
  // },
  // delete: async (req: NextRequest) => {
  //   return await ProductsService.delete(req);
  // },
};
