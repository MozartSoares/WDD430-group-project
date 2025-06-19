import { dbConnect } from "@/lib/mongodb";
import { ProductsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/products/[id] - get product by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ProductsController.getById(id);
}

// PUT /api/products/[id] - update product by id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  return await ProductsController.update(id, body);
}

// DELETE /api/products/[id] - delete product by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ProductsController.delete(id);
}
