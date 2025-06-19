import { dbConnect } from "@/lib/mongodb";
import { ReviewsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/reviews/product/[id] - get review by product id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ReviewsController.getByProductId(id);
}
