import {
  ValidateBody,
  ValidateId,
  handleControllerError,
} from "@/lib/validation";
import { ReviewService } from "@/server";
import {
  type CreateReviewSchema,
  type UpdateReviewSchema,
  createReviewSchema,
  updateReviewSchema,
} from "@/types";

export class ReviewsController {
  static async getAll() {
    try {
      const reviews = await ReviewService.getAll();
      return Response.json({ success: true, reviews });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getById(id: string) {
    try {
      const review = await ReviewService.getById(id);
      if (!review) {
        return Response.json(
          { success: false, message: "Review not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, review });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getByProductId(id: string) {
    try {
      const review = await ReviewService.getByProductId(id);
      if (!review) {
        return Response.json(
          { success: false, message: "Reviews of that product not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, review });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async getByUserId(id: string) {
    try {
      const review = await ReviewService.getByUserId(id);
      if (!review) {
        return Response.json(
          { success: false, message: "Reviews by that user not found" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, review });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateBody(createReviewSchema)
  static async create(payload: CreateReviewSchema) {
    try {
      const review = await ReviewService.create(payload);
      if (!review) {
        return Response.json(
          { success: false, message: "Review not created" },
          { status: 401 },
        );
      }
      return Response.json({
        success: true,
        message: "Review created successfully",
        review,
      });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  @ValidateBody(updateReviewSchema)
  static async update(id: string, payload: UpdateReviewSchema) {
    try {
      const review = await ReviewService.update(id, payload);
      if (!review) {
        return Response.json(
          { success: false, message: "Review not updated" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, review });
    } catch (error) {
      return handleControllerError(error);
    }
  }

  @ValidateId
  static async delete(id: string) {
    try {
      const deleted = await ReviewService.delete(id);
      if (!deleted) {
        return Response.json(
          { success: false, message: "Review not deleted" },
          { status: 404 },
        );
      }
      return Response.json({ success: true, message: "Review deleted" });
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
