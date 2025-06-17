import { dbConnect } from "@/lib/mongodb";
import { ReviewsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/reviews/ - get review by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ReviewsController.getById(id);
}

// PUT /api/reviews/[id] - update review by id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  return await ReviewsController.update(id, body);
}

// DELETE /api/reviews/[id] - delete review by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ReviewsController.delete(id);
}
