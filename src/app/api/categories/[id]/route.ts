import { dbConnect } from "@/lib/mongodb";
import { CategoriesController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/categories/[id] - get category by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await CategoriesController.getById(id);
}

// PUT /api/categories/[id] - update category by id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  return await CategoriesController.update(id, body);
}

// DELETE /api/categories/[id] - delete category by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await CategoriesController.delete(id);
}
