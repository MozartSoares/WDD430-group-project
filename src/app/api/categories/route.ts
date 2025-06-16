import { dbConnect } from "@/lib/mongodb";
import { CategoriesController } from "@/server";
import type { NextRequest } from "next/server";

// GET /api/categories - lists all categories
export async function GET() {
  await dbConnect();
  return await CategoriesController.getAll();
}

// POST /api/categories - creates a category
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  return await CategoriesController.create(body);
}
