import { dbConnect } from "@/lib/mongodb";
import { ReviewsController } from "@/server";
import type { NextRequest } from "next/server";

// GET /api/reviews - lists all reviews
export async function GET() {
  await dbConnect();
  return await ReviewsController.getAll();
}

// POST /api/reviews - creates a review
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  return await ReviewsController.create(body);
}
