import { dbConnect } from "@/lib/mongodb";
import { ReviewsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/reviews/user/[id] - get review by user id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ReviewsController.getByUserId(id);
}
